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
import { useEffect, useState } from "react";
import {collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import UserChat from "../../components/UserChat/UserChat";

const Chats = () => {
  let router = useIonRouter();

  const { userList, setUserList, user, isGoogleLogin, googleUser} = UserAuth();
  const [searchText, setSearchText] = useState("");

  let userId = user.uid;
  let user1;
  if(isGoogleLogin){
    user1 = user.id
  }else{
    user1 = user.uid
  }


  useEffect(()=> {
    if(isGoogleLogin){
      userId= user.id;
    }
      const userRef = collection(db, 'users')
    //creating query object
    const q = query(userRef, where('uid', 'not-in', [userId]))
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
      <IonToolbar className="chats-toolbar" color="white">
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
          <IonSearchbar animated className="chats-searchbar" value={searchText} onIonChange={e => setSearchText(e.detail.value)}></IonSearchbar>
        </div>
        <IonGrid className="chats-container">
          {userList.filter((user) => {
            if(searchText === ""){
              return user
            }else if(user.name.toLowerCase().includes(searchText.toLowerCase())){
              return user
            }
          }).map((user) => {
            return (
              <UserChat
                key={user.uid}
                id={user.uid}
                name={user.name}
                user1= {user1}
              />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
