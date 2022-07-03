import {
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonSearchbar,
  useIonRouter,
} from "@ionic/react";
import "./Chats.css";
import { ellipsisVertical } from "ionicons/icons";
import chatsData from "../../chatData";
import ChatRowComponent from "../../components/Chat-Component/ChatRowComponent";
const chatData = chatsData.data.chats;

const Chats = () => {
  
  let router = useIonRouter();

  const goToProfile = () => {
     router.push("/home/profile")
  }
  return (
    <IonPage>
      <IonContent fullscreen className="chats-page">
        <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Konnect.</IonLabel>
          <IonImg src="assets/images/profile.png" className="profile-pic" onClick={(e)=>{goToProfile()}}/>
          <IonIcon
            icon={ellipsisVertical}
            className="chats-vertical-dots"
            size="large"
          />
        </IonCard>
        <div className="searchbar-container">
          <IonSearchbar animated className="chats-searchbar"></IonSearchbar>
        </div>
        <div className="chats-container">
          {chatData.map((chat) => {
            return (
              <ChatRowComponent
                key={chat.id}
                name={chat.name}
                image={chat.image}
                msg={chat.msg}
                time={chat.time}
              />
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
