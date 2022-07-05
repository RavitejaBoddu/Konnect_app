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
import { ellipsisVertical } from "ionicons/icons";
import { useState } from "react";
import chatData from "../../chatData";
import ChatRowComponent from "../../components/Chat-Component/ChatRowComponent";
import "./Friends.css";

const Friends = () => {
  const contactData = chatData.data.chats;
  const [isContactPage] = useState(true);

  let router = useIonRouter();

  const goToProfile = () => {
    router.push("/home/profile");
  };
  return (
    <IonPage>
      <IonContent fullscreen className="friends-page">
        <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Friends</IonLabel>
          <IonImg
            src="assets/images/profile.png"
            className="profile-pic"
            onClick={(e) => {
              goToProfile();
            }}
          />
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
          {contactData.map((chat) => {
            return (
              <ChatRowComponent
                key={chat.id}
                name={chat.name}
                image={chat.image}
                isContactPage={isContactPage}
              />
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Friends;
