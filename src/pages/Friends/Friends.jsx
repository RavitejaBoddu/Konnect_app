import {
  IonCard,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ellipsisVertical } from "ionicons/icons";
import { useEffect, useState } from "react";
import ChatRowComponent from "../../components/Chat-Component/ChatRowComponent";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import "./Friends.css";

const Friends = () => {
  const [isContactPage] = useState(true);

  let router = useIonRouter();
  const { userList, setUserList, user} = UserAuth();

 const currentId = user.uid;


  useEffect(()=> {
    const userRef = collection(db, 'users')
    //creating query object
    const q = query(userRef, where('uid', 'not-in', [currentId]))

    //executing query
    onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      });
      setUserList(users);
  })
}, []);

  const goToProfile = () => {
    router.push("/home/profile");
  };
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
      <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Friends.</IonLabel>
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
      </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="friends-page">
        <div className="searchbar-container">
          <IonSearchbar animated className="chats-searchbar"></IonSearchbar>
        </div>
        <IonGrid className="chats-container">
          {userList.map((user) => {
            return (
              <ChatRowComponent
                key={user.uid}
                id={user.uid}
                name={user.name}
                isContactPage={isContactPage}
              />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Friends;
