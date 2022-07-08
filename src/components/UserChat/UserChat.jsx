import { IonCol, IonIcon, IonImg, IonLabel, IonRow, useIonRouter } from "@ionic/react";
import './UserChat.css'
import {checkmarkDoneOutline} from 'ionicons/icons'

const UserChat = (props) => {

    const {id, name} = props;
    let router = useIonRouter();

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
            {/* <IonLabel className='chat-text-msg'>{msg}</IonLabel> */}
        </IonCol>
        <IonCol className='chat-info'>
            <IonLabel className='chat-info-time'>8:55 AM</IonLabel>
             <IonIcon className='chat-info-img' icon={checkmarkDoneOutline} /> 
        </IonCol>
    </IonRow>
  )
}

export default UserChat