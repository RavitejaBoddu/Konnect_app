import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  IonPopover,
  useIonRouter,
  useIonViewWillEnter,
  IonList,
  useIonLoading,
  useIonAlert,
} from "@ionic/react";
import {
  arrowBackOutline,
  ellipsisVertical,
  ellipse,
  sendSharp,
  call,
  videocam,
  mic,
  stopCircleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import "./ChatPage.css";
import Message from "../../components/Message/Message";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

const ChatPage = () => {
  const { userList, hideTabs } = UserAuth();
  const [presentAlert] = useIonAlert();
  const { id } = useParams();
  let router = useIonRouter();

  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const user1 = auth.currentUser.uid;
  const user2 = id;

  const handleAlert = (msg) => {
    presentAlert({
      header: "Alert",
      message: msg,
      buttons: ["OK"],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "lp-sp-alert",
      color: "white",
    });
  };

  const handleMessage = async () => {
    // messages => id => chat => addDoc
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    if (text == null || text === "") {
    } else {
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
      });

      await setDoc(doc(db, "lastMsg", id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        unread: true,
      });
      setIsRecording(false);
      setText("");
    }
  };

  useEffect(() => {
    const getMsgs = () => {
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const msgRef = collection(db, "messages", id, "chat");
      //create query
      const q = query(msgRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
      });
    };
    getMsgs();
  }, [user2, user1]);

  const getUserData = () => {
    let data = {};
    for (var i = 0; i < userList.length; i++) {
      if (userList[i].uid === id) {
        return (data = userList[i]);
      }
    }
    return data;
  };

  useIonViewWillEnter(() => hideTabs());

  const usersData = getUserData();

  const goBack = () => {
    router.push("/home", "back", "pop");
  };

  const handleAudioCall = (id) => {
    router.push(`/audio/${id}`);
  };

  const handleVideoCall = (id) => {
    router.push(`/video/${id}`);
  };

  const handleSpeech = async() => {
    try{
      setIsRecording(true);
      SpeechRecognition.requestPermission();

      const {available} = await SpeechRecognition.available();
      console.log("Available: ",available);
      if(available){
      SpeechRecognition.start({
        language: "en-IN",
        // maxResults: 2,
        partialResults: true,
        popup: false,
        prompt: "Say something..."
      });

      SpeechRecognition.addListener("partialResults", (data) => {
        console.log("partialResults was fired", data.value);
        if(data.value && data.value.length > 0){
          console.log(data.value);
          setText(data.value[0]);
        }
      });
    }
  }catch(e){
    handleAlert(e.message)
  }
  };

  const stopRecording = async() => {
    setIsRecording(false);
    await SpeechRecognition.stop();
  }

  return (
    <IonPage className="chat-page">
      <IonHeader>
        <IonToolbar color="white">
          <IonButtons slot="start">
            <IonButton
              color="jet-black"
              onClick={(e) => {
                goBack();
              }}
              className="back-button"
            >
              <IonIcon icon={arrowBackOutline} size="large" />
            </IonButton>
          </IonButtons>
          <IonCard className="chat-toolbar">
            <IonRow className="chat-profile-container">
              <IonItem lines="none" color="white">
                <IonAvatar slot="start" className="profile-pic-container">
                  {usersData.photoURL ? (
                    <IonImg src={usersData.photoURL} />
                  ) : (
                    <IonImg src="assets/images/user.png" />
                  )}
                </IonAvatar>
                <IonCol className="profile-info-status">
                  <IonLabel className="profile-name">{usersData.name}</IonLabel>
                  {usersData.isOnline ? (
                    <IonLabel color="success" className="online-toggle">
                      <IonIcon
                        icon={ellipse}
                        color="success"
                        className="online-toggle-icon"
                      />
                      Online
                    </IonLabel>
                  ) : (
                    <IonLabel color="medium" className="online-toggle">
                      <IonIcon
                        icon={ellipse}
                        color="medium"
                        className="online-toggle-icon"
                      />{" "}
                      Offline
                    </IonLabel>
                  )}
                </IonCol>
              </IonItem>
              <IonCol className="chat-profile-detail"></IonCol>
            </IonRow>
            <IonButton
              fill="clear"
              onClick={(e) => {
                handleAudioCall(user2);
              }}
              className="chatspage-header-btn"
            >
              <IonIcon
                color="success"
                icon={call}
                className="chatspage-header-icon"
              />
            </IonButton>
            <IonButton
              fill="clear"
              onClick={(e) => {
                handleVideoCall(user2);
              }}
              className="chatspage-header-btn"
            >
              <IonIcon
                color="success"
                icon={videocam}
                className="chatspage-header-icon"
              />
            </IonButton>
            <IonButton
              fill="clear"
              id="chatpage-popover-btn"
              className="chatspage-header-btn"
            >
              <IonIcon
                icon={ellipsisVertical}
                className="chatspage-header-icon"
              />
            </IonButton>
            <IonPopover
              className="chatpage-popover"
              trigger="chatpage-popover-btn"
              dismiss-on-select="true"
              size="auto"
              mode="md"
              alignment="start"
              animated="true"
            >
              <IonContent>
                <IonList>
                  <IonItem
                    button="true"
                    className="chatpage-popover-item"
                    detail="false"
                  >
                    View Contact
                  </IonItem>
                  <IonItem
                    button="true"
                    className="chatpage-popover-item"
                    detail="false"
                  >
                    Delete
                  </IonItem>
                </IonList>
              </IonContent>
            </IonPopover>
          </IonCard>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="chat-page-content">
        <IonGrid className="messages-container">
          {msgs.map((msg, i) => {
            return <Message key={i} msg={msg} user1={user1} user2={user2} />;
          })}
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar className="message-send-toolbar" color="white">
          <IonRow className="message-send-container">
            <IonCol className="message-send-input-container"> 
            <IonInput
            className="send-input"
            type="text"
            placeholder="Enter Your message here"
            value={text}
            onIonChange={(e) => setText(e.detail.value)}
            required
          />
          </IonCol>
          
          <IonCol className="msg-send-btns">
          { isRecording ?
          <IonButton fill="clear" className="msg-send-btn" onClick={(e) => stopRecording()}>
            <IonIcon
              icon={stopCircleOutline}
              color="danger"
              size="large"
              slot="end"
              className="msg-send-icon"
            />
            </IonButton>  :
            <IonButton fill="clear" className="msg-send-btn" onClick={(e) => handleSpeech()}>
            <IonIcon
              icon={mic}
              color="medium"
              size="large"
              slot="end"
              className="msg-send-icon"
            /> 
            </IonButton>
}
            <IonButton fill="clear" className="msg-send-btn" onClick={(e) => handleMessage()}>
            <IonIcon
              icon={sendSharp}
              color="primary"
              size="large"
              className="msg-send-icon"
              slot="end"
            />
            </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ChatPage;
