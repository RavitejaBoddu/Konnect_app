import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { UserAuth } from "../../context/AuthContext";
import "./Settings.css";
import { caretForward, toggle } from "ionicons/icons";
import { useState } from "react";

const Settings = () => {
  const { logout } = UserAuth();
  let router = useIonRouter();
  const [present] = useIonToast();
  const [showLoading, setShowLoading] = useState(false);


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

  const handleLogout = () => {
    setShowLoading(true);
    logout();
    try {
      const msg = "You have Logged out successfully";
      logout();
      handleToast(msg)
      router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="settings-page">
        <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Settings</IonLabel>
        </IonCard>
        <IonGrid className="settings">
          <IonRow className="settings-row">
            <IonCol className="setting-heading">General</IonCol>
            <IonCol className="three-items">
              <IonLabel>Account</IonLabel>
              <IonLabel>Cj_barry</IonLabel>
              <IonIcon icon={caretForward} />
            </IonCol>
            <IonCol className="two-items">
              <IonLabel>Notifications</IonLabel>
              <IonIcon icon={caretForward} />
            </IonCol>
          </IonRow>
          <IonRow className="settings-row">
            <IonCol className="setting-heading">Themes</IonCol>
            <IonCol className="three-items">
              <IonLabel>Text size</IonLabel>
              <IonLabel>Medium</IonLabel>
              <IonIcon icon={caretForward} />
            </IonCol>
            <IonCol className="two-items">
              <IonLabel>Night Mode</IonLabel>
              <IonIcon icon={toggle} size="large" color="primary" />
            </IonCol>
            <IonCol className="two-items">
              <IonLabel>Auto Night Mode</IonLabel>
              <IonIcon icon={toggle} size="large" color="primary" />
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
            <IonLoading
              cssClass="lp-sp-spinner"
              isOpen={showLoading}
              message={"logging out..."}
              duration={1000}
              spinner={"circular"}
              animated={true}
              keyboardClose={true}
            />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
