import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonToggle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { UserAuth } from "../../context/AuthContext";
import "./Settings.css";
import { caretForward,
  //  toggle 
  } from "ionicons/icons";
import { auth } from "../../firebase";
// import { useState } from "react";

const Settings = () => {
  const { logout, updateStatus, user, showTabs } = UserAuth();
  let router = useIonRouter();
  const [present] = useIonToast();
  const [show, dismiss] = useIonLoading();
  // const [isNightMode, setIsNightMode] = useState();

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

  const handleLogout = async () => {
    try {
      show({
        message: "Logging out...",
        duration: 1000,
        spinner: "circular",
        cssClass: "lp-sp-spinner",
        animated: true,
        keyboardClose: true,
        mode: "ios",
      });
      const msg = "You have Logged out successfully";
      await updateStatus(auth, false);
      logout();
      setTimeout(() => {
        handleToast(msg);
      }, 2000);
      router.push("/login");
    } catch (error) {
      dismiss();
      handleToast(error.message);
    }
  };

  const goToProfile = () => {
    router.push("/home/profile");
  };
  // const toggleNightMode = () => {

  // }

  useIonViewWillEnter(() => showTabs());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="white">
          <IonCard className="chats-header" lines="none">
            <IonLabel className="chats-heading tracking-in-expand">
              Settings
            </IonLabel>
          </IonCard>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="settings-page">
        <IonGrid className="settings">
          <IonRow className="settings-row">
            <IonCol className="heading">General</IonCol>
            <IonCol className="three-items" onClick={(e) => goToProfile()}>
              <IonLabel>Account:-</IonLabel>
              <IonLabel>{user.displayName}</IonLabel>
              <IonIcon icon={caretForward} />
            </IonCol>
            <IonCol className="two-items">
              <IonLabel>Notifications</IonLabel>
              <IonIcon icon={caretForward} />
            </IonCol>
          </IonRow>
          <IonRow className="settings-row">
            <IonCol className="heading">Themes</IonCol>
            <IonCol className="three-items">
              <IonLabel>Text size</IonLabel>
              <IonLabel>Medium</IonLabel>
              <IonIcon icon={caretForward} />
            </IonCol>
            <IonCol className="two-items">
              <IonLabel>Night Mode</IonLabel>
              <IonToggle color="blue" />
            </IonCol>
            <IonCol className="two-items">
              <IonLabel>Auto Night Mode</IonLabel>
              <IonToggle color="blue" />
            </IonCol>
          </IonRow>
          <IonRow className="settings-row">
            <IonCol className="setting-heading">About</IonCol>
            <IonCol className="setting-col">
              <IonLabel>Content Policy</IonLabel>
            </IonCol>
            <IonCol className="setting-col">
              <IonLabel>Privacy policy</IonLabel>
            </IonCol>
            <IonCol className="setting-col">
              <IonLabel>User Agreement</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="settings-row">
            <IonCol className="setting-heading">Support</IonCol>
            <IonCol className="setting-col">
              <IonLabel>Help FAQ</IonLabel>
            </IonCol>
            <IonCol className="setting-col">
              <IonLabel>Report a Bug</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="logout-btn">
            <IonButton
              onClick={(e) => handleLogout()}
              color="primary"
              shape="round"
            >
              Logout
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
