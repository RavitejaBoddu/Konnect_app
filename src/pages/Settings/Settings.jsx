import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { UserAuth } from '../../context/AuthContext';
import './Settings.css';

const Settings = () => {

  const { logout } = UserAuth();
  let router = useIonRouter();

  const handleLogout = () => {
    logout();
    try{
      logout();
      router.push('/login')
    }catch(error){
      alert(error.message)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Settings page" />
        <IonButton onClick={(e)=>handleLogout()}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;