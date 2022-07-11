import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { people, apps, chatbubbles, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

import Chats from "../Chats/Chats";
import Groups from "../Groups/Groups";
import Friends from "../Friends/Friends";
import Settings from "../Settings/Settings";
import Login from "../Login/Login";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import ChatComponent from "../ChatComponent/ChatComponent";

const Home = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
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
          <Route exact path="/home">
            <Redirect to="/home/chats" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/chat/:id">
            <ProtectedRoute>
              <ChatComponent />
            </ProtectedRoute>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="white">
          <IonTabButton tab="chats" href="/home/chats">
            <IonIcon icon={chatbubbles} />
            <IonLabel>Chats</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="groups" href="/home/groups">
            <IonIcon icon={apps} />
            <IonLabel>Groups</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="friends" href="/home/friends">
            <IonIcon icon={people} />
            <IonLabel>Friends</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/home/settings">
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Home;
