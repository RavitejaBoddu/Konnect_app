import { IonCol, IonIcon, IonImg, IonLabel, IonRow, useIonRouter } from "@ionic/react";
import './ChatRowComponent.css'
import { chatbubbleEllipses} from 'ionicons/icons'

const ChatRowComponent = (props) => {
  
    const {id, name, } = props;
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
      <IonLabel className='contact-text-name'>{name}</IonLabel>  
        </IonCol>
        <IonCol className='chat-info'>
         <IonIcon className='msg-icon' color="primary" icon={chatbubbleEllipses} /> 
        </IonCol>
    </IonRow>
  )
}

export default ChatRowComponent