import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonSearchbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Groups.css";
import chatsData from "../../chatData";
import ChatRowComponent from "../../components/Chat-Component/ChatRowComponent";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
const groupsData = chatsData.data.groups;

const Groups = () => {
  const [data, setData] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const { user } = UserAuth();


  const pushData = () => {
    const max = data.length + 10;
    const min = max - 10;
    const newData = [];
    for(let i = min; i<max; i++){
      groupsData[i].id = groupsData[i].id + i * i;
      newData.push(groupsData[i]);
    }
    setData([
      ...data,
      ...newData
    ]);
  }

  const loadData = (ev) => {
    console.log(data.length);
    setTimeout(() => {
      pushData();
      console.log('Loaded data');
      ev.target.complete();
      console.log(data.length);
      if(data.length === 10){
        setInfiniteDisabled(data.length < 10);
      }
    }, 5000);
  }

  useIonViewWillEnter(() => {
    pushData();
  });

  return (
    <IonPage>
      <Header heading="Contacts"/>
      <IonContent fullscreen className="groups-page">
        <div className="searchbar-container">
          <IonSearchbar animated className="chats-searchbar"></IonSearchbar>
        </div>
        <div className="chats-container">
          {data.map((chat) => {
            return (
              <ChatRowComponent
                key={chat.id}
                name={chat.name}
                image={chat.image}
                msg={chat.msg}
                time={chat.time}
              />
            );
          })}
        </div>
        <IonInfiniteScroll onIonInfinite={loadData} threshold="100px" disabled={isInfiniteDisabled}>
            <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data...">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Groups;
