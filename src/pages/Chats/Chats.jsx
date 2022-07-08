import {
  IonCard,
  IonContent,
  IonGrid,
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
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import {collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import UserChat from "../../components/UserChat/UserChat";

const Chats = () => {
  let router = useIonRouter();

  const { userList, setUserList} = UserAuth();

  console.log(userList);

  useEffect(()=> {
    const userRef = collection(db, 'users')
    //creating query object
    const q = query(userRef, where('uid', 'not-in', [auth.currentUser.uid]))

    //executing query
    const unsub = onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      });
      setUserList(users);
  })
  return () => {
    unsub();
  };
}, []);

  const goToProfile = () => {
    router.push("/home/profile");
  };
  return (
    <IonPage>
      <IonContent fullscreen className="chats-page">
        <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Konnect.</IonLabel>
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
        <IonGrid className="chats-container">
          {userList.map((user) => {
            return (
              <UserChat
                key={user.uid}
                id={user.uid}
                name={user.name}
                isOnline={user.isOnline}
              />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
