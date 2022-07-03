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
import { qrCodeOutline, arrowBackOutline, chevronForward, atOutline, callOutline, lockClosedOutline, calendarNumberOutline, informationCircleOutline } from "ionicons/icons";
import "./Profile.css";

const Profile = () => {

    let router = useIonRouter();

    const handleBack = () => {
        router.push("/home/chats");
      }
  return (
    <IonPage>
      <IonContent fullscreen className="profile-page">
        <IonCard className="chats-header" lines="none">
          <IonIcon
            icon={arrowBackOutline}
            className="chats-vertical-dots"
            size="large"
            color="light"
            onClick={(e)=>{handleBack()}}
          />
          <IonLabel className="profile-heading">My Profile</IonLabel>
          <IonIcon
            icon={qrCodeOutline}
            className="chats-vertical-dots"
            size="large"
            color="light"
          />
        </IonCard>
        <IonGrid className="profile-details">
        <IonCard className="pro-pic-container">
          <IonImg src="assets/images/profile-pic.png" />
        </IonCard>
        <IonRow className="row">
            <IonCol>
                <IonLabel className="Profile-name">
                    Cj_Barry
                </IonLabel>
            </IonCol>
            <IonCol>
                <IonImg src="assets/icon/Edit.svg" />
            </IonCol>
          </IonRow >
          <IonRow className="flex-row"> 
            <IonCol className="col1">
                <IonLabel className="flex-row-label">Email Address</IonLabel>
                <IonLabel className="flex-row-value"><IonIcon icon={atOutline} />cj_barry@gmail.com</IonLabel>
            </IonCol>
            <IonCol className="col2">
                <IonIcon icon={chevronForward} size="large" color="medium"/>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
            <IonLabel className="flex-row-label">Phone Number</IonLabel>
                <IonLabel className="flex-row-value"><IonIcon icon={callOutline} />+91-9999999999</IonLabel>
            </IonCol>
            <IonCol className="col2">
            <IonIcon icon={chevronForward} size="large" color="medium"/>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
            <IonLabel className="flex-row-label">Password</IonLabel>
                <IonLabel className="flex-row-value"><IonIcon icon={lockClosedOutline} />********</IonLabel>
            </IonCol>
            <IonCol className="col2">
            <IonIcon icon={chevronForward} size="large" color="medium"/>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
            <IonLabel className="flex-row-label">Date of Birth</IonLabel>
                <IonLabel className="flex-row-value"><IonIcon icon={calendarNumberOutline} />17-JAN-1996</IonLabel>
            </IonCol>
            <IonCol className="col2">
            <IonIcon icon={chevronForward} size="large" color="medium"/>
            </IonCol>
          </IonRow>
          <IonRow className="flex-row">
            <IonCol className="col1">
            <IonLabel className="flex-row-label">About</IonLabel>
                <IonLabel className="flex-row-value"><IonIcon icon={informationCircleOutline} />Hi, this is about me!</IonLabel>
            </IonCol>
            <IonCol className="col2">
            <IonIcon icon={chevronForward} size="large" color="medium"/>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;