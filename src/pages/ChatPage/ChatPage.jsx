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
  useIonAlert,
  isPlatform,
  useIonActionSheet,
  useIonLoading,
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
  attachOutline,
  imageOutline,
  closeCircleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { auth, db, storage } from "../../firebase";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatPage = () => {
  const { userList, hideTabs } = UserAuth();
  const [presentAlert] = useIonAlert();
  const { id } = useParams();
  let router = useIonRouter();
  const [present, dismiss] = useIonActionSheet();
  const [img, setImg] = useState("");
  const [showLoading, dismissLoading] = useIonLoading();

  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const user1 = auth.currentUser.uid;
  const user2 = id;

  const handleActionSheet = () => {
    present({
      buttons: [
        {
          text: "Upload image",
          icon: imageOutline,
          handler: () => {
            handleUploadImage();
          },
        },
        {
          text: "Cancel",
          icon: closeCircleOutline,
          handler: () => {
            dismiss();
          },
        },
      ],
      header: "Attachments",
      cssClass: "chatpage-actionsheet",
    });
  };

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
    if (img) {
      const uploadImg = async () => {
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        const imgRef = ref(
          storage,
          `chat-images/${new Date().getTime()} - ${img.name}`
        );
        try {
          showLoading({
            message: "Sending image...",
            spinner: "circular",
            cssClass: "lp-sp-spinner",
            animated: true,
            keyboardClose: true,
            mode: "ios",
          });
          const snap = await uploadBytesResumable(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await addDoc(collection(db, "messages", id, "images"), {
            image: url,
            imagePath: snap.ref.fullPath,
            createdAt: Timestamp.fromDate(new Date()),
          });
          await addDoc(collection(db, "messages", id, "chat"), {
            image: url,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
          });
          await setDoc(doc(db, "lastMsg", id), {
            text: "image",
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            unread: true,
          });
          setImg("");
          dismissLoading();
        } catch (err) {
          handleAlert(err.message);
        }
      };
      uploadImg();
    }
    getMsgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user2, user1, img]);

  const handleUploadImage = () => {
    document.getElementById("upload-img").click();
  };

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

  const gotoUserProfile = (id) => {
    router.push(`/userprofile/${id}`, "forward", "push");
  };

  const deleteChat = async () => {
    // const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    // const lastmsgRef = doc(db, "lastMsg", id);
    try {
      // showLoading({
      //   message: "Deleting Chat...",
      //   spinner: "circular",
      //   cssClass: "lp-sp-spinner",
      //   animated: true,
      //   keyboardClose: true,
      //   mode: "ios",
      // });
      // await deleteDoc(doc(db, "messages", id));
      // router.push("/home");
      // dismissLoading();
    } catch (error) {
      handleAlert(error.message);
    }
  };

  const handleSpeech = async () => {
    try {
      setIsRecording(true);
      SpeechRecognition.requestPermission();

      const { available } = await SpeechRecognition.available();
      console.log("Available: ", available);
      if (available) {
        SpeechRecognition.start({
          language: "en-IN",
          partialResults: true,
          popup: false,
          prompt: "Say something...",
        });

        SpeechRecognition.addListener("partialResults", (data) => {
          console.log("partialResults was fired", data.value);
          if (data.value && data.value.length > 0) {
            console.log(data.value);
            setText(data.value[0]);
          }
        });
      }
    } catch (e) {
      handleAlert(e.message);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await SpeechRecognition.stop();
  };

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
            <IonButton fill="clear" className="chatspage-header-btn">
              <IonIcon
                color="success"
                icon={call}
                className="chatspage-header-icon"
              />
            </IonButton>
            <IonButton fill="clear" className="chatspage-header-btn">
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
                className="chatspage-header-icon header-dots"
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
                <IonList className="chatpage-popover-list">
                  <IonItem
                    lines="none"
                    button="true"
                    className="chatpage-popover-item"
                    detail="false"
                    onClick={(e) => {
                      gotoUserProfile(id);
                    }}
                  >
                    View Contact
                  </IonItem>
                  <IonItem
                    lines="none"
                    button="true"
                    className="chatpage-popover-item"
                    detail="false"
                    onClick={(e) => {
                      deleteChat();
                    }}
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
            <IonCol className="attach-btn">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="upload-img"
                onChange={(e) => setImg(e.target.files[0])}
              />
              <IonButton
                fill="clear"
                onClick={(e) => {
                  handleActionSheet();
                }}
              >
                <IonIcon icon={attachOutline} size="large" color="danger" />
              </IonButton>
            </IonCol>
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
            {isPlatform("capacitor") ? (
              <IonCol className="msg-send-btns">
                {isRecording ? (
                  <IonButton
                    fill="clear"
                    className="msg-send-btn"
                    onClick={(e) => stopRecording()}
                  >
                    <IonIcon
                      icon={stopCircleOutline}
                      color="danger"
                      size="large"
                      slot="end"
                      className="msg-send-icon"
                    />
                  </IonButton>
                ) : (
                  <IonButton
                    fill="clear"
                    className="msg-send-btn"
                    onClick={(e) => handleSpeech()}
                  >
                    <IonIcon
                      icon={mic}
                      color="medium"
                      size="large"
                      slot="end"
                      className="msg-send-icon"
                    />
                  </IonButton>
                )}
                <IonButton
                  fill="clear"
                  className="msg-send-btn"
                  onClick={(e) => handleMessage()}
                >
                  <IonIcon
                    icon={sendSharp}
                    color="primary"
                    size="large"
                    className="msg-send-icon"
                    slot="end"
                  />
                </IonButton>
              </IonCol>
            ) : (
              <IonCol className="msg-send-btns">
                <IonButton
                  fill="clear"
                  className="msg-send-btn"
                  onClick={(e) => handleMessage()}
                >
                  <IonIcon
                    icon={sendSharp}
                    color="primary"
                    size="large"
                    className="msg-send-icon"
                    slot="end"
                  />
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ChatPage;
