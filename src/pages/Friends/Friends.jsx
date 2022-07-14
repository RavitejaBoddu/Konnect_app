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
} from "@ionic/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ellipsisVertical } from "ionicons/icons";
import { useEffect, useState } from "react";
import ChatRowComponent from "../../components/Chat-Component/ChatRowComponent";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import "./Friends.css";

const Friends = () => {
  const [isContactPage] = useState(true);

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

  const goToProfile = () => {
    router.push("/home/profile");
  };
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="white">
      <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Friends.</IonLabel>
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
                photoURL={user.photoURL}
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
