import {
  IonAvatar,
  IonButton,
  IonButtons,
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
import { arrowBackOutline, call, mic } from "ionicons/icons";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import "./AudioCall.css";

const AudioCall = () => {
  const { userList } = UserAuth();
  let router = useIonRouter();

  const { id } = useParams();

  // const servers = {
  //     iceServers: [
  //         {
  //             urls: [
  //                 "stun:stun1.l.google.com:19302",
  //                 "stun:stun2.l.google.com:19302",
  //             ],
  //         },
  //     ],
  //     iceCandidatePoolSize: 10,
  // };

  const getUserData = () => {
    let data = {};
    for (var i = 0; i < userList.length; i++) {
      if (userList[i].uid === id) {
        return (data = userList[i]);
      }
    }
    return data;
  };

  const userData = getUserData()

  const goBack = () => {
    router.push(router.push(`/chat/${id}`, "back"));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="audio-call-page">
        <IonItem className="audio-call-back-btn">
          <IonButtons slot="start">
            <IonButton
              onClick={(e) => {
                goBack();
              }}
              className="back-button"
            >
              <IonIcon icon={arrowBackOutline} size="large" color="white" />
            </IonButton>
          </IonButtons>
        </IonItem>
        <IonGrid className="audio-call-card">
          <IonRow className="audio-call-user-info">
          {userData ? (
              <IonLabel className="audio-call-name">{userData.name}</IonLabel>
            ) : (
              <IonLabel className="audio-call-name">Username</IonLabel>
            )}
            <IonAvatar className="audio-call-avatar">
              {userData.photoURL ? (
                <IonImg src={userData.photoURL} />
              ) : (
                <IonImg src="assets/images/default-user.jpg" />
              )}
            </IonAvatar>
            <IonLabel className="audio-call-status">
                Dailing. . . .
            </IonLabel>
          </IonRow>
          <IonRow className="audio-call-buttons">
            <IonButton className="audio-call-btn-call" color="danger">
              <IonIcon
                className="audio-call-btn-icon"
                color="white"
                icon={call}
              />
            </IonButton>
            <IonButton className="audio-call-btn-mic" color="medium">
              <IonIcon
                className="audio-call-btn-icon"
                icon={mic}
                color="jet-black"
              />
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AudioCall;
