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
  const { userList, setUserList, user, isGoogleLogin, googleUser} = UserAuth();
  const [searchText, setSearchText] = useState("");

 let userId = user.uid;


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

  const goToProfile = () => {
    router.push("/home/profile");
  };
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="white">
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
