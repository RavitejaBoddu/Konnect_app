import { IonAvatar, IonCol, IonIcon, IonImg, IonLabel, IonRow, useIonRouter } from "@ionic/react";
import './UserChat.css'
import {checkmarkDoneOutline} from 'ionicons/icons'
import { useEffect, useState } from "react";
import { onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from "../../firebase";
import Moment from "react-moment";


const UserChat = (props) => {

    const {id, name, user1, photoURL } = props;
    let router = useIonRouter();
    const [data, setData]= useState({});
    const [time, setTime] = useState("");

    const user2= id;
    const c_id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    useEffect(() => {
      const getLastMsg = () => {
        onSnapshot(doc(db, "lastMsg", c_id), (doc) => {
          setData(doc.data());
          setTime(doc.data().createdAt.toDate().toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          }));
        });
      }
      getLastMsg();

      }, [c_id]);

    const openChat = async (id) => {
        const docSnap = await getDoc(doc(db, 'lastMsg', c_id));
        if(docSnap.data()){
          if(docSnap.data().from !== user1){
            await updateDoc(doc(db, 'lastMsg', c_id), {
              unread:false
            })
          }
        }
        router.push(`/chat/${id}`)
    }

  return (
    <IonRow className='chat-row' onClick={(e)=> {openChat(user2)}}>
        <IonCol className='chat-img-container'>
        <IonAvatar className="chat-pic-container">
              {photoURL ? 
              <IonImg
                src={photoURL}
                className="chat-img"
              /> : <IonImg
              src="assets/images/user.png"
              className="chat-img"
            /> 
              }
            </IonAvatar>
        </IonCol>
        <IonCol className='chat-text'>    
        <IonLabel className='chat-text-name'>{name}</IonLabel>
        {data && <IonLabel className='chat-text-msg'>{data.text}</IonLabel> }   
        </IonCol>
        <IonCol className='chat-info'>
          {data?.from !== user1 && data?.unread &&  <IonLabel color="white" className="unread">New</IonLabel>}
        {data ? <IonLabel className='user-last-msg-time'>{time}</IonLabel> :
        <IonIcon className='double-tick-img' color="dark3"icon={checkmarkDoneOutline} />}
        </IonCol> 
    </IonRow>
  )
}

export default UserChat