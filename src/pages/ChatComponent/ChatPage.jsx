import {
  IonAvatar,
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
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowBackOutline, ellipsisVertical, ellipse, sendSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from '../../firebase';
import { collection, addDoc, Timestamp, orderBy, query, onSnapshot, setDoc, doc } from 'firebase/firestore';
import "./ChatPage.css";
import Message from "../../components/Message/Message";

const ChatComponent = () => {
  const { userList } = UserAuth();


  const { id } = useParams();
  let router = useIonRouter();

  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);

    const user1 = auth.currentUser.uid;
    const user2 = id;

    const handleMessage = async() => {
        // messages => id => chat => addDoc 
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createdAt:Timestamp.fromDate(new Date())
        })

        await setDoc(doc(db, "lastMsg", id), {
          text,
          from: user1,
          to: user2,
          createdAt:Timestamp.fromDate(new Date()),
          unread: true
        });

        setText("");
    }

    useEffect(()=> {

      const getMsgs = () => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

      const msgRef = collection(db, 'messages', id, 'chat');
      //create query
      const q = query(msgRef, orderBy('createdAt', 'asc'))

       onSnapshot(q, querySnapshot => { 
        let msgs = [];
        querySnapshot.forEach(doc => {
          msgs.push(doc.data())
        });
        setMsgs(msgs);
      })
      }
      getMsgs();
      
      return(()=>{
        // unsubscribe();
      })
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

  const hideTabs = () => {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = true;
    }
  }

  useIonViewWillEnter(() => hideTabs())

  const usersData = getUserData();

  const goBack = () => {
    router.push("/home/chats");
  };

  return (
    <IonPage className="chat-page">
      <IonHeader>
      <IonToolbar color="white">
      <IonCard className="chat-toolbar">
          <IonIcon
            icon={arrowBackOutline}
            size="large"
            className="chat-toolbar-icon"
            onClick={(e) => {
              goBack();
            }}
          />
          <IonRow className="chat-profile-container">
            <IonItem lines="none" color="white">
            <IonAvatar slot="start" className="profile-pic-container">
              {
                usersData.photoURL ? <IonImg
                src={usersData.photoURL}  
              /> : <IonImg
              src="assets/images/user.png"  
            />
              }
            
            </IonAvatar>
            <IonCol className="profile-info-status">
            <IonLabel className="profile-name">{usersData.name}</IonLabel>
              {usersData.isOnline ? (
                <IonLabel color="success" className="online-toggle">
                  <IonIcon icon={ellipse} color="success"  className="online-toggle-icon"/> Online
                </IonLabel>
              ) : (
                <IonLabel color="medium" className="online-toggle">
                  <IonIcon icon={ellipse} color="medium" /> Offline
                </IonLabel>
              )}
              </IonCol>
          </IonItem>
            <IonCol className="chat-profile-detail">
              {/* <IonLabel>{usersData.name}</IonLabel> */}
              {/* {usersData.isOnline ? (
                <IonLabel color="success" className="online-toggle">
                  <IonIcon icon={ellipse} color="success"  className="online-toggle-icon"/> Online{" "}
                </IonLabel>
              ) : (
                <IonLabel color="medium" className="online-toggle">
                  <IonIcon icon={ellipse} color="medium" /> Offline{" "}
                </IonLabel>
              )} */}
            </IonCol>
          </IonRow>
          <IonIcon
            icon={ellipsisVertical}
            size="large"
            className="chat-toolbar-icon"
          />
        </IonCard>
      </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="chat-page-content">
        <IonGrid className="messages-container">
          {
            msgs.map((msg, i) => {
              return(
              <Message  key={i} msg={msg} user1= {user1} user2= {user2}/>
              )
            })
          }
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar className="message-send" color="white">
        <IonInput
              className="send-input"
              type="text"
              placeholder="Enter Your message here"
              value={text}
              onIonChange={(e) => setText(e.detail.value)}
              required
            />
        <IonIcon icon={sendSharp} color="primary" size='large' onClick={(e)=> handleMessage()} slot="end"/>
        </IonToolbar>
          </IonFooter>
    </IonPage>  
  );
};

export default ChatComponent;
