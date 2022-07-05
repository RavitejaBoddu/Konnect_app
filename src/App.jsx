import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
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

setupIonicReact();

const App = () => (
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

export default App;
