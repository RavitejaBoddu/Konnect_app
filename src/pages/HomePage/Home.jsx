import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { people, apps, chatbubbles, settings } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

import Chats from '../Chats/Chats';
import Groups from '../Groups/Groups';
import Friends from '../Friends/Friends';
import Settings from '../Settings/Settings';
import Login from '../Login/Login';


const Home = () => {
    return (
      <IonReactRouter>
         <IonTabs>
         <IonRouterOutlet>
         <Route exact path="/chats">
            <Chats />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route exact path="/home">
            <Redirect to="/chats" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          </IonRouterOutlet>
      <IonTabBar slot="bottom">
      <IonTabButton tab="chats" href="/chats">
      <IonIcon icon={chatbubbles} />
        <IonLabel>Chats</IonLabel>
      </IonTabButton>
      <IonTabButton tab="groups" href="/groups">
        <IonIcon icon={apps} />
        <IonLabel>Groups</IonLabel>
      </IonTabButton>
      <IonTabButton tab="friends" href="/friends">
        <IonIcon icon={people} />
        <IonLabel>Friends</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/settings">
        <IonIcon icon={settings} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
 </IonReactRouter>
      );
}

export default Home