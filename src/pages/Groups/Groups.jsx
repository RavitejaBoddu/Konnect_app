import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import "./Groups.css";
import chatsData from "../../chatData";
import ChatRowComponent from "../../components/Chat-Component/ChatRowComponent";
const groupsData = chatsData.data.groups;

const Groups = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="chats-page">
        <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Groups</IonLabel>
          <IonImg src="assets/images/profile.png" className="profile-pic" />
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
          {groupsData.map((chat) => {
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

export default Groups;
