import {
  IonCard,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { arrowBackOutline, ellipsisVertical } from "ionicons/icons";
import { useParams } from "react-router";
import "./ChatComponent.css";
import chatsData from "../../chatData";

const ChatComponent = (props) => {
  const data = chatsData.data.chats;
  const { id } = useParams();
  let router = useIonRouter();

  const goBack = () => {
    router.push("/home");
  };

  let userData = new Object();

  userData = data[id];

  return (
    <IonPage className="chat-page">
      <IonContent fullscreen className="chats-page">
        <IonCard className="chat-toolbar">
          <IonIcon
            icon={arrowBackOutline}
            size="large"
            className="chat-toolbar-icon"
            onClick={(e) => {
              goBack();
            }}
          />
          <IonRow className="chat-profile-container">
            <IonImg src={userData.image} className="chat-img" />
            <IonCol className="chat-profile-detail">
              <IonLabel>{userData.name}</IonLabel>
              <IonLabel color="success">Online</IonLabel>
            </IonCol>
          </IonRow>
          <IonIcon
            icon={ellipsisVertical}
            size="large"
            className="chat-toolbar-icon"
          />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ChatComponent;
