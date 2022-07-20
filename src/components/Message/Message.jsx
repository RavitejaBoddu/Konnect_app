import { IonCol, IonItem, IonLabel, IonRow } from "@ionic/react";
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
      <IonItem lines="none" className={msg.from === user1 ? "me" : "friend"}>
        <IonCol className="msg-text">{msg.text}</IonCol>
        <IonLabel className="msg-time" slot="end">
          {/* {time} */}
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </IonLabel>
      </IonItem>
    </IonRow>
  );
};

export default Message;
