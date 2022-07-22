import {
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSearchbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Chats.css";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import UserChat from "../../components/UserChat/UserChat";
import Header from "../../components/Header/Header";
import { personCircle } from "ionicons/icons";

const Chats = () => {
  const { userList, setUserList, user, showTabs } = UserAuth();
  const [searchText, setSearchText] = useState("");
  
  const modal = useRef(null);

  const currentId = user.uid;

  useEffect(() => {
    const getUsers = async () => {
      const userRef = collection(db, "users");
      //creating query object
      const q = query(userRef, where("uid", "not-in", [currentId]));
      //executing query
      onSnapshot(q, (querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setUserList(users);
      });
    };
    getUsers();
  }, [setUserList, currentId]);

  function dismiss() {
    modal.current?.dismiss();
  }

  useIonViewWillEnter(() => showTabs());

  return (
    <IonPage>
      <Header heading="Konnect." />
      <IonContent fullscreen className="chats-page">
        <div className="searchbar-container">
          <IonSearchbar
            mode="ios"
            animated
            className="chats-searchbar"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value)}
          ></IonSearchbar>
        </div>
        <IonGrid className="chats-container">
          {userList
            // eslint-disable-next-line array-callback-return
            .filter((user) => {
              if (searchText === "") {
                return user;
              } else if (
                user.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return user;
              }
            })
            .map((user) => {
              return (
                <UserChat
                  key={user.uid}
                  id={user.uid}
                  name={user.name}
                  user1={currentId}
                  photoURL={user.photoURL}
                />
              );
            })}
        </IonGrid>
        <IonModal id="example-modal" ref={modal} trigger="open-custom-dialog">
          <div className="wrapper">
            <h1>Dialog header</h1>
        
            <IonList lines="none">
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon icon={personCircle}></IonIcon>
                <IonLabel>Item 1</IonLabel>
              </IonItem>
              <IonItem button={true} detail={false} onClick={dismiss}>
                <IonIcon icon={personCircle}></IonIcon>
                <IonLabel>Item 2</IonLabel>
              </IonItem>
            </IonList>
            </div>
           </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
