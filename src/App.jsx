import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/HomePage/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { App as app } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import ChatPage from "./pages/ChatPage/ChatPage";
import UserProfile from "./pages/UserProfile/UserProfile";

setupIonicReact();

const App = () => {
  const [updateDetails, setUpdateDetails] = useState({});
  const [appVersion, setAppVersion] = useState("");

  const [show, dismiss] = useIonLoading();

  const updateRef = doc(db, "Konnect_app_config", "NF0sNetgoLAHF6d473kQ");

  const [presentAlert] = useIonAlert();

  const handleAlert = (msg, title, btn, appVersion) => {
    presentAlert({
      header: title,
      subHeader: `Version: ${appVersion}`,
      message: msg,
      buttons: [
        {
          text: btn,
          role: "Download",
          handler: async () => {
            show({
              message: "Please wait...",
              duration: 2000,
              spinner: "circular",
              cssClass: "lp-sp-spinner",
              animated: true,
              keyboardClose: true,
              mode: "ios",
            });
            await Browser.open({
              url: "https://play.google.com/store/apps/details?id=com.konnect_ptg.app",
            });
            dismiss();
          },
        },
      ],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "lp-sp-alert",
    });
  };

  const getConfigData = async () => {
    const docSnap = await getDoc(updateRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUpdateDetails(data.updateMsg);
      setAppVersion(data.current);
    } else {
      console.log("No such document!");
    }
  };

  const checkUpdate = async () => {
    try {
      if (isPlatform("android")) {
        const currentAppInfo = await app.getInfo();
        if (appVersion > currentAppInfo.version) {
          handleAlert(
            updateDetails.msg,
            updateDetails.title,
            updateDetails.btn,
            appVersion
          );
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getConfigData();
    checkUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AuthContextProvider>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/home">
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </Route>
              <Route path="/chat/:id">
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              </Route>
              <Route path="/userprofile/:id">
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </AuthContextProvider>
    </>
  );
};

export default App;
