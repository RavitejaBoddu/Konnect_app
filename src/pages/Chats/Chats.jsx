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
  useIonViewWillEnter,
} from "@ionic/react";
import "./Chats.css";
import { ellipsisVertical } from "ionicons/icons";
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import {collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import UserChat from "../../components/UserChat/UserChat";

const Chats = () => {
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

const showTabs = () => {
  const tabsEl = document.querySelector('ion-tab-bar');
  if (tabsEl) {
    tabsEl.hidden = false;
  }
}

useIonViewWillEnter(() => showTabs());
 
  const goToProfile = () => {
    router.push("/home/profile");
  };


  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
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
      </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="chats-page">
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
                user1= {currentId}
              />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
