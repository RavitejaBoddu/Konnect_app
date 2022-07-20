import {
  IonContent,
  IonGrid,
  IonPage,
  IonSearchbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ContactRow from "../../components/ContactRow/ContactRow";
import Header from "../../components/Header/Header";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

const Friends = () => {
  const [isContactPage] = useState(true);
  const { userList, setUserList, user, showTabs } = UserAuth();
  const [searchText, setSearchText] = useState("");

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
    return () => {};
  }, [setUserList, currentId]);

  useIonViewWillEnter(() => showTabs());

  return (
    <IonPage>
      <Header heading="Friends" />
      <IonContent fullscreen className="friends-page">
        <div className="searchbar-container">
          <IonSearchbar
            animated
            mode="ios"
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
                <ContactRow
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
