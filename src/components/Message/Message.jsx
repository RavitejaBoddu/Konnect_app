import { IonCard, IonCardContent, IonCardHeader, IonCol, IonImg, IonItem, IonLabel, IonRow } from "@ionic/react";
import "./Message.css";
import Moment from "react-moment";
import { useEffect, useRef } from "react";

const Message = (props) => {
  const { msg, user1 } = props;

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);

  // const time = msg.createdAt.toDate().toLocaleTimeString(navigator.language, {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  return (
    <IonRow
      className={msg.from === user1 ? "message_wrapper-own" : "message_wrapper"}
      ref={scrollRef}
    >
      {
        msg.image ?
        <IonCard className={msg.from === user1 ? "msg-img-me" : "msg-img-friend"} >
          <IonCardHeader class="msg-img-card-header">
          <IonImg src={msg.image} className="msg-image"/>
          </IonCardHeader>
          <IonCardContent class="msg-img-card-content">
          <IonRow className="msg-image-time" slot="end">
        <Moment className="msg-image-time-text" fromNow>{msg.createdAt.toDate()}</Moment>
      </IonRow>
          </IonCardContent>
        </IonCard>:
        <IonItem lines="none" className={msg.from === user1 ? "me" : "friend"}>
        <IonCol className="msg-text">{msg.text}</IonCol>
      <IonLabel className="msg-time" slot="end">
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </IonLabel>
    </IonItem>        
      }
    </IonRow>
  );
};

export default Message;
