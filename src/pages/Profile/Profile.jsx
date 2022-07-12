import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { updateProfile } from "firebase/auth";
import {
  qrCodeOutline,
  arrowBackOutline,
  atOutline,
  callOutline,
  lockClosedOutline,
  calendarNumberOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { closeCircleOutline, checkmarkCircleOutline } from "ionicons/icons";
import "./Profile.css";


const Profile = () => {
  const { user } = UserAuth();
  const user_id = user.uid;
  const [uname, setUname] = useState(user.displayName);
  const [isUpdate, setIsUpdate] = useState(false);
  const [show, dismiss] = useIonLoading();

  let router = useIonRouter();
  const [presentAlert] = useIonAlert();

  const [present] = useIonToast();

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

  const handleAlert = async (msg) => {
    presentAlert({
      header: "Alert",
      message: msg,
      buttons: ["OK"],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "lp-sp-alert",
    });
  };
  const handleUpdate = async () => {

    const userRef = doc(db, "users", user_id);

    try {
      show({
        message: "Logging in please wait...",
        duration: 5000,
        spinner: "circular",
        cssClass: "lp-sp-spinner",
        animated: true,
        keyboardClose: true,
        mode: "ios",
      });
      await updateProfile(auth.currentUser, {
        displayName: uname,
      })
        .then(() => {
          console.log(auth.currentUser.displayName);
        })
        .catch((error) => {
          handleAlert(error.message);
        });

      await updateDoc(userRef, {
        name: uname,
      });
      handleToast("Name has been Successfully Updated!")

      setIsUpdate(false);
      dismiss();
    } catch (error) {
      dismiss();
      handleAlert(error.message);
    }
  };

  const toggleUpdate = () => {
    setIsUpdate(true);
  };
  const cancelUpdate = () => {
    setIsUpdate(false);
  };

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
          {isUpdate ? (
            <IonRow className="update-row">
              <IonInput
                className="update-input"
                type="text"
                color="dark3"
                placeholder="Enter Name"
                value={uname}
                onIonChange={(e) => setUname(e.detail.value)}
                required
              ></IonInput>
              <IonIcon
              className="update-icon"
                icon={checkmarkCircleOutline}
                size="large"
                color="dark3"
                onClick={(e) => {
                  handleUpdate();
                }}
              />
              <IonIcon
              className="update-icon"
                icon={closeCircleOutline}
                size="large"
                color="dark3"
                onClick={(e) => {
                  cancelUpdate();
                }}
              />
            </IonRow>
          ) : (
            <IonRow className="row">
              <IonLabel className="Profile-name">{user.displayName}</IonLabel>
              <IonImg
                src="assets/icon/Edit.svg"
                className="edit-icon"
                onClick={(e) => toggleUpdate()}
              />
            </IonRow>
          )}
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
