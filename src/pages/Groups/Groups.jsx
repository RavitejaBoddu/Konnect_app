import {
  IonAvatar,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import "./Groups.css";
import chatsData from "../../chatData";
import ChatRowComponent from "../../components/Chat-Component/ChatRowComponent";
import { useState } from "react";
import { auth } from "../../firebase";
const groupsData = chatsData.data.groups;

const Groups = () => {
  let router = useIonRouter();
  const [data, setData] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);


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
      if(data.length === 12){
        setInfiniteDisabled(data.length < 12);
      }
    }, 5000);
  }

  useIonViewWillEnter(() => {
    pushData();
  });


  const goToProfile = () => {
    router.push("/home/profile");
  };


  return (
    <IonPage>
      <IonHeader>
      <IonToolbar className="chats-toolbar" color="white">
      <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading">Contacts</IonLabel>
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
