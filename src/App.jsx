import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// import { people, apps, chatbubbles, settings } from 'ionicons/icons';

import Chats from './pages/Chats/Chats';
import Groups from './pages/Groups/Groups';
import Friends from './pages/Friends/Friends';
import Settings from './pages/Settings/Settings';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/HomePage/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
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
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
        {/* <IonTabBar slot="bottom">
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
    </IonTabBar> */}
        {/* </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
