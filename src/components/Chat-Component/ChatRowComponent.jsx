import { IonCol, IonIcon, IonImg, IonLabel, IonRow } from "@ionic/react";
import './ChatRowComponent.css'
import {checkmarkDoneOutline} from 'ionicons/icons'

const ChatRowComponent = (props) => {
  
    const {id, name, image, msg, time} = props;

  return (
    <IonRow className='chat-row'>
        <IonCol className='chat-img-container'>
            <IonImg src={image}  className='chat-img'/>
        </IonCol>
        <IonCol className='chat-text'>
            <IonLabel className='chat-text-name'>{name}</IonLabel>
            <IonLabel className='chat-text-msg'>{msg}</IonLabel>
        </IonCol>
        <IonCol className='chat-info'>
            <IonLabel className='chat-info-time'>{time}</IonLabel>
            <IonIcon className='chat-info-img' icon={checkmarkDoneOutline} />
        </IonCol>
    </IonRow>
  )
}

export default ChatRowComponent