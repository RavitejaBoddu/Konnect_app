import {
  IonCard,
  IonCol,
    IonContent,
    IonIcon,
    IonImg,
    IonLabel,
    IonPage,
    IonRow,
    useIonRouter,
  } from "@ionic/react";
  import { arrowBackOutline, ellipsisVertical } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import './ChatComponent.css'  

const ChatComponent = () => {

  const { userList} = UserAuth();
  const [userData, setUserData] = useState({});

  const { id } = useParams();
  let router = useIonRouter();

 useEffect(()=> {
  for(var i=0; i<userList.length ; i++){
    if(userList[i].uid === id){
      setUserData(userList[i])
    }
  }
 }, [userList]);

  const goBack = () => {
    router.push("/home/chats");
  }

  return (
    <IonPage className='chat-page'>
      <IonContent fullscreen className="chats-page">
      <IonCard className='chat-toolbar'>
        <IonIcon icon = {arrowBackOutline} size="large" className="chat-toolbar-icon" onClick={(e)=> {goBack()}}/>
        <IonRow  className='chat-profile-container'>
          <IonImg src="assets/images/profiles/andrew.png" className="chat-img"/>
          <IonCol className='chat-profile-detail'>
            <IonLabel>{userData.name}</IonLabel>
            {userData.isOnline ?
            <IonLabel color="success"> Online </IonLabel> :
            <IonLabel color="medium"> Offline </IonLabel>
}
          </IonCol>
        </IonRow>
        <IonIcon icon={ellipsisVertical}  size="large" className="chat-toolbar-icon"/>
      </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default ChatComponent