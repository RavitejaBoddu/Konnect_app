import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import { people, apps, chatbubbles, settings } from 'ionicons/icons';

import Chats from "./pages/Chats/Chats";
import Groups from "./pages/Groups/Groups";
import Friends from "./pages/Friends/Friends";
import Settings from "./pages/Settings/Settings";

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
import Profile from "./pages/Profile/Profile";
import ChatComponent from "./pages/ChatComponent/ChatComponent";
import { App as app } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useEffect, useState } from "react";
import axios from "axios";
import { collection, doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "./firebase";


setupIonicReact();

const App = () => {
  const [updateDetails, setUpdateDetails] = useState({});
  const [appVersion, setAppVersion] = useState("");

  const updateRef = doc(db, "Konnect_app_config", "NF0sNetgoLAHF6d473kQ");
  

  const url =
    "https://crudcrud.com/api/b531895bf7034294bd51e53ecf1a89ce/konnect-app-config/62cbe08a6f047803e8aec34a";

  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

 

  const handleToast = (msg) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: "dark3",
      mode: "ios",
    });
  };

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
            handleToast("Download Clicked");
            await Browser.open({
              url: "https://play.google.com/store/apps/details?id=com.konnect_ptg.app",
            });
          },
        },
      ],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "lp-sp-alert",
    });
  };

  const getAppInfo = async () => {
    let info = await app.getInfo();
    return info;
  };

  const getConfigData = async () => {
    const docSnap = await getDoc(updateRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", docSnap.data());
      setUpdateDetails(data.updateMsg);
      setAppVersion(data.current);
    } else {
      console.log("No such document!");
    }
  };

  const checkUpdate = async () => {
    try {
      if (isPlatform("android")) {
        const currentAppInfo = getAppInfo();
        if (appVersion > (await currentAppInfo).version) {
          const msg = updateDetails.msg;
          const title = updateDetails.title;
          const btn = updateDetails.btn;
          handleAlert(msg, title, btn, appVersion);
        }
      } 
      // else {
      //   const msg = "App is not running on android platform";
      //   handleToast(msg);
      // }
    } 
    catch (error) {
      // handleAlert(error.message);
    }
  };

  useEffect(() => {
    getConfigData();
    if (isPlatform("android")){
      getAppInfo();
    }
  }, [0]);

    checkUpdate();

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
              <Route path="/home/chats">
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              </Route>
              <Route path="/home/groups">
                <ProtectedRoute>
                  <Groups />
                </ProtectedRoute>
              </Route>
              <Route path="/home/friends">
                <ProtectedRoute>
                  <Friends />
                </ProtectedRoute>
                <Friends />
              </Route>
              <Route path="/home/settings">
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              </Route>
              <Route path="/home/profile">
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Route>
              <Route path="/chat/:id">
                <ProtectedRoute>
                  <ChatComponent />
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
