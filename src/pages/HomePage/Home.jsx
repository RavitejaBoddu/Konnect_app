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

const Home = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route path="/home/chats">
              <Chats />
            </Route>
            <Route path="/home/groups">
              <Groups />
            </Route>
            <Route path="/home/friends">
              <Friends />
            </Route>
            <Route path="/home/settings">
              <Settings />
            </Route>
          <Route exact path="/home">
            <Redirect to="/home/chats" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="chats" href="/home/chats">
            <IonIcon icon={chatbubbles} />
            <IonLabel>Chats</IonLabel>
          </IonTabButton>
          <IonTabButton tab="groups" href="/home/groups">
            <IonIcon icon={apps} />
            <IonLabel>Groups</IonLabel>
          </IonTabButton>
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
