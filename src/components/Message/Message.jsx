import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Message.css";
import Moment from "react-moment";
import { useEffect, useRef, useState } from "react";

const Message = (props) => {
  const { msg, user1 } = props;
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);

  // const time = msg.createdAt.toDate().toLocaleTimeString(navigator.language, {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {msg.image && (
            <>
            <IonCard
              className="display-image-container"
            >
              <IonCardHeader class="msg-img-card-header">
                <IonImg src={msg.image} className="display-image" />
              </IonCardHeader>
              <IonCardContent class="msg-img-card-content">
                
              </IonCardContent>
            </IonCard>
            <a href={msg.image} download target="blank">
                <IonButton fill="clear">Download</IonButton>
                </a>
            {/* <IonButton onClick={(e)=>{downloadImage()}} fill="clear">Download</IonButton> */}
            </>
          )}
        </IonContent>
      </IonModal>
      <IonRow
        className={
          msg.from === user1 ? "message_wrapper-own" : "message_wrapper"
        }
        ref={scrollRef}
      >
        {msg.image ? (
          <IonCard
            className={msg.from === user1 ? "msg-img-me" : "msg-img-friend"}
            onClick
          >
            <IonCardHeader
              class="msg-img-card-header"
              onClick={() => setIsOpen(true)}
            >
              <IonImg src={msg.image} className="msg-image" />
            </IonCardHeader>
            <IonCardContent class="msg-img-card-content">
              <IonRow className="msg-image-time" slot="end">
                <Moment className="msg-image-time-text" fromNow>
                  {msg.createdAt.toDate()}
                </Moment>
              </IonRow>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonItem
            lines="none"
            className={msg.from === user1 ? "me" : "friend"}
          >
            <IonCol className="msg-text">{msg.text}</IonCol>
            <IonLabel className="msg-time" slot="end">
              <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </IonLabel>
          </IonItem>
        )}
      </IonRow>
    </>
  );
};

export default Message;
