import {
  IonAvatar,
  IonCol,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import "./ContactRow.css";
import { chatbubbleEllipses } from "ionicons/icons";

const ContactRow = (props) => {
  const { id, name, isContactPage, photoURL } = props;
  let router = useIonRouter();

  const openChat = (id) => {
    router.push(`/chat/${id}`, "forward");
  };

  return (
    <IonRow
      className="chat-row"
      onClick={(e) => {
        openChat(id);
      }}
    >
      <IonCol className="contact-img-container">
        <IonAvatar className="chat-pic-container">
          {photoURL ? (
            <IonImg src={photoURL} className="chat-img" />
          ) : (
            <IonImg src="assets/images/user.png" className="chat-img" />
          )}
        </IonAvatar>
      </IonCol>
      <IonCol className="chat-text">
        {isContactPage ? (
          <IonLabel className="contact-text-name">{name}</IonLabel>
        ) : (
          <IonLabel className="chat-text-name">{name}</IonLabel>
        )}
      </IonCol>
      <IonCol className="message-icon">
        <IonIcon
          className="msg-icon"
          color="primary"
          icon={chatbubbleEllipses}
        />
      </IonCol>
    </IonRow>
  );
};

export default ContactRow;
