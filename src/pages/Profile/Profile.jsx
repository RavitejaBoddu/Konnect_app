import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import {
  qrCodeOutline,
  arrowBackOutline,
  atOutline,
  callOutline,
  lockClosedOutline,
  calendarNumberOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { UserAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user } = UserAuth();

  let router = useIonRouter();

  const handleBack = () => {
    router.push("/home/chats");
  };
  return (
    <IonPage>
      <IonContent fullscreen className="profile-page">
        <IonCard className="chats-header" lines="none">
          <IonIcon
            icon={arrowBackOutline}
            className="chats-vertical-dots"
            size="large"
            color="white"
            onClick={(e) => {
              handleBack();
            }}
          />
          <IonLabel className="profile-heading">My Profile</IonLabel>
          <IonIcon
            icon={qrCodeOutline}
            className="chats-vertical-dots"
            size="large"
            color="white"
          />
        </IonCard>
        <IonCard className="pro-pic-container">
          <IonImg src="assets/images/propic.jpg" />
        </IonCard>
        <IonGrid className="profile-details">
          <IonRow className="row">
            <IonLabel className="Profile-name">{user.displayName}</IonLabel>
            <IonImg src="assets/icon/Edit.svg" className="edit-icon" />
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
              <IonLabel className="flex-row-label">Email Address</IonLabel>
              <IonLabel className="flex-row-value">
                <IonIcon icon={atOutline} />
                {user.email}
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
              <IonLabel className="flex-row-label">Phone Number</IonLabel>
              <IonLabel className="flex-row-value">
                <IonIcon icon={callOutline} />
                +91-9999999999
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
              <IonLabel className="flex-row-label">Password</IonLabel>
              <IonLabel className="flex-row-value">
                <IonIcon icon={lockClosedOutline} />
                ********
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
              <IonLabel className="flex-row-label">Date of Birth</IonLabel>
              <IonLabel className="flex-row-value">
                <IonIcon icon={calendarNumberOutline} />
                17-JAN-1996
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
              <IonLabel className="flex-row-label">About</IonLabel>
              <IonLabel className="flex-row-value">
                <IonIcon icon={informationCircleOutline} />
                Hi, this is about me!
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
