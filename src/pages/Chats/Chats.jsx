import {
  IonAvatar,
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

  const { userList, setUserList, user} = UserAuth();
  const [searchText, setSearchText] = useState("");

 const currentId = user.uid;

  useEffect(()=> {
    const userRef = collection(db, 'users')
    //creating query object
    const q = query(userRef, where('uid', 'not-in', [currentId]))
    //executing query
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      });
      setUserList(users);
  })
  return(()=>{
    unsubscribe();
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
          <IonAvatar  className="profile-pic">{
            auth.currentUser.photoURL ?
            <IonImg
            src={auth.currentUser.photoURL}
            onClick={(e) => {
              goToProfile();
            }}
          /> :
          <IonImg
            src="assets/images/profile.png"
            onClick={(e) => {
              goToProfile();
            }}
          />
          }
          </IonAvatar>
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
          {userList.filter((user) =>{
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
                user1= {currentId}
                photoURL = {user.photoURL}
              />
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
