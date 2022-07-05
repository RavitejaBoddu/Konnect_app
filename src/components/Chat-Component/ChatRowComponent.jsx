import { IonCol, IonIcon, IonImg, IonLabel, IonRow, useIonRouter } from "@ionic/react";
import './ChatRowComponent.css'
import {checkmarkDoneOutline, chatbubbleEllipses} from 'ionicons/icons'

const ChatRowComponent = (props) => {
  
    const {id, name, image, msg, time, isContactPage} = props;
    let router = useIonRouter();

    const openChat = (id) => {
        router.push(`/chat/${id}`)
    }

  return (
    <IonRow className='chat-row' onClick={(e)=> {openChat(id)}}>
        <IonCol className='chat-img-container'>
            <IonImg src={image}  className='chat-img'/>
        </IonCol>
        <IonCol className='chat-text'>
        {
                isContactPage ? <IonLabel className='contact-text-name'>{name}</IonLabel>  : <IonLabel className='chat-text-name'>{name}</IonLabel>
            }
            
            <IonLabel className='chat-text-msg'>{msg}</IonLabel>
        </IonCol>
        <IonCol className='chat-info'>
            <IonLabel className='chat-info-time'>{time}</IonLabel>{
                isContactPage ? <IonIcon className='msg-icon' color="primary" icon={chatbubbleEllipses} />  : <IonIcon className='chat-info-img' icon={checkmarkDoneOutline} /> 
            }
        </IonCol>
    </IonRow>
  )
}

export default ChatRowComponent