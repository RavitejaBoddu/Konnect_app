import { IonCol, IonIcon, IonImg, IonLabel, IonRow, useIonRouter } from "@ionic/react";
import './UserChat.css'
import {checkmarkDoneOutline} from 'ionicons/icons'
import { useEffect, useState } from "react";
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from "../../firebase";
const UserChat = (props) => {

    const {id, name, user1 } = props;
    let router = useIonRouter();
    const [data, setData]= useState({});
    // const [time, setTime] = useState("");

    const user2= id;

    useEffect(() => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        onSnapshot(doc(db, "lastMsg", id), (doc) => {
          setData(doc.data());
        });
      }, [id]);

    const openChat = (id) => {
        router.push(`/chat/${id}`)
    }

  return (
    <IonRow className='chat-row' onClick={(e)=> {openChat(id)}}>
        <IonCol className='chat-img-container'>
            <IonImg src="assets/images/profiles/andrew.png"  className='chat-img'/>
        </IonCol>
        <IonCol className='chat-text'>    
        <IonLabel className='chat-text-name'>{name}</IonLabel>
        {data && <IonLabel className='chat-text-msg'>{data.text}</IonLabel> }   
        </IonCol>
        <IonCol className='chat-info'>
        {/* {data && <IonLabel className='user-last-msg-time'>{time.toDate().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    })}</IonLabel> }  */}
        <IonIcon className='chat-info-img' icon={checkmarkDoneOutline} /> 
        </IonCol>
    </IonRow>
  )
}

export default UserChat