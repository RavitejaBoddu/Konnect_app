import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { collection, onSnapshot } from "firebase/firestore";
import {
  arrowBackOutline,
  atOutline,
  calendarNumberOutline,
  callOutline,
  informationCircleOutline,
  lockClosedOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import "./UserProfile.css";

const UserProfile = () => {
  const { userList } = UserAuth();
  const router = useIonRouter();
  const { id } = useParams();
  const [chatMedia, setChatMedia] = useState([]);

  const user1 = auth.currentUser.uid;
  const user2 = id;

  useEffect(() => {
    const getMediaData = async () => {
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const msgRef = collection(db, "messages", id, "images");
      onSnapshot(msgRef, (querySnapshot) => {
        let media = [];
        querySnapshot.forEach((doc) => {
          media.push({ ...doc.data(), id: doc.id });
        });
        setChatMedia(media);
      });
    };
    getMediaData();
  }, [id, user1, user2]);


  console.log(chatMedia);

  const getUserData = () => {
    let data = {};
    for (var i = 0; i < userList.length; i++) {
      if (userList[i].uid === id) {
        return (data = userList[i]);
      }
    }
    return data;
  };

  const usersData = getUserData();

  const goBack = () => {
    router.push("/home", "back", "pop");
  };

  return (
    <IonPage>
      <IonItem
        lines="none"
        className="userprofile-toolbar"
        color="konnect-blue"
      >
        <IonButton
          onClick={(e) => {
            goBack();
          }}
          className="user-profile-back-button"
          fill="clear"
        >
          <IonIcon icon={arrowBackOutline} size="large" color="white" />
        </IonButton>
      </IonItem>

      <IonContent fullscreen className="profile-page">
        <IonCard className="user-avatar-container">
          <IonAvatar className="user-pro-pic-container">
            {usersData.photoURL ? (
              <IonImg
                className="shadow-drop-2-center fade-in-fwd"
                src={usersData.photoURL}
              />
            ) : (
              <IonImg src="assets/images/default-user.jpg" />
            )}
          </IonAvatar>
          <IonRow className="name-row">
            <IonLabel className="user-profile-name">{usersData.name}</IonLabel>
          </IonRow>
          <IonRow className="name-row">
          <IonLabel className="user-profile-email">
              {usersData.email}
            </IonLabel>
          </IonRow>
        </IonCard>
        
        <IonGrid className="grid">
        <IonCard className="media-container">
          <IonRow className="media-label">Media</IonRow>
          <IonRow className="image-container">
            {chatMedia.map((image) => {
              return (
                <IonAvatar className="media" key={image.id}>
                  <IonImg src={image.image}></IonImg>
                </IonAvatar>
              );
            })}
          </IonRow>
        </IonCard>          
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Email</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={atOutline} />
              {usersData.email}
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Phone Number</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={callOutline} />
              +91-9999999999
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Password</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={lockClosedOutline} />
              *************
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Date of Birth</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={calendarNumberOutline} />
              DD-MON-19XX
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">About</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={informationCircleOutline} />
              Hi, this is about me!
            </IonLabel>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
