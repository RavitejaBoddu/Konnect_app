import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { people, chatbubbles, settings } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

import Chats from "../Chats/Chats";
import Groups from "../Groups/Groups";
import Friends from "../Friends/Friends";
import Settings from "../Settings/Settings";
import Login from "../Login/Login";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import ChatPage from "../ChatPage/ChatPage";
import AudioCall from "../AudioCall/AudioCall";

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
              <ChatPage />
            </ProtectedRoute>
          </Route>
          <Route path="/audio/:id">
            <ProtectedRoute>
              <AudioCall />
            </ProtectedRoute>
          </Route>
          <Route exact path="/home">
            <Redirect to="/home/chats" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="white" className="tabBar">
          <IonTabButton className="tab-btn" tab="chats" href="/home/chats">
            <IonIcon icon={chatbubbles} />
            <IonLabel>Chats</IonLabel>
          </IonTabButton>
          {/* <IonTabButton className="tab-btn" tab="groups" href="/home/groups">
            <IonIcon icon={apps} />
            <IonLabel>Contacts</IonLabel>
          </IonTabButton> */}
          <IonTabButton className="tab-btn" tab="friends" href="/home/friends">
            <IonIcon icon={people} />
            <IonLabel>Friends</IonLabel>
          </IonTabButton>
          <IonTabButton
            className="tab-btn"
            tab="settings"
            href="/home/settings"
          >
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Home;
