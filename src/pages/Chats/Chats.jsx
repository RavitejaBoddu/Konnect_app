import {
  IonContent,
  IonGrid,
  IonPage,
  IonSearchbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Chats.css";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import UserChat from "../../components/UserChat/UserChat";
import Header from "../../components/Header/Header";

const Chats = () => {

  const { userList, setUserList, user} = UserAuth();
  const [searchText, setSearchText] = useState("");

 const currentId = user.uid;

  useEffect(()=> {

    const getUsers = async () => {
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
  }
  getUsers();
}, [setUserList, currentId]);

const showTabs = () => {
  const tabsEl = document.querySelector('ion-tab-bar');
  if (tabsEl) {
    tabsEl.hidden = false;
  }
}

useIonViewWillEnter(() => showTabs());

  return (
    <IonPage>
      <Header heading="Konnect."/>
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
