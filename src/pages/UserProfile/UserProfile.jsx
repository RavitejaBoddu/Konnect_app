import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  arrowBackOutline,
  atOutline,
  calendarNumberOutline,
  callOutline,
  informationCircleOutline,
  lockClosedOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Mousewheel, Scrollbar } from "swiper";
import { useParams } from "react-router";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import "./UserProfile.css";

const UserProfile = () => {
  const { userList } = UserAuth();
  const router = useIonRouter();
  const { id } = useParams();
  const [chatMedia, setChatMedia] = useState([]);

  const user1 = auth.currentUser.uid;
  const user2 = id;

  useEffect(() => {
    const getMediaData = async () => {
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const mediaRef = collection(db, "messages", id, "images");

      const q = query(mediaRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        let media = [];
        querySnapshot.forEach((doc) => {
          media.push({ ...doc.data(), id: doc.id });
        });
        setChatMedia(media);
      });
    };
    getMediaData();
  }, [id, user1, user2]);

  const getUserData = () => {
    let data = {};
    for (var i = 0; i < userList.length; i++) {
      if (userList[i].uid === id) {
        return (data = userList[i]);
      }
    }
    return data;
  };

  const usersData = getUserData();

  const goBack = () => {
    router.push("/home", "back", "pop");
  };

  return (
    <IonPage>
      <IonToolbar className="userprofile-toolbar">
        <IonButtons slot="start">
          <IonButton
            color="white"
            onClick={(e) => {
              goBack();
            }}
            className="profile-back-button"
          >
            <IonIcon icon={arrowBackOutline} size="large" />
          </IonButton>
        </IonButtons>
        <IonLabel className="user-profile-heading">{usersData.name}</IonLabel>
      </IonToolbar>

      <IonContent fullscreen className="profile-page">
        <IonCard className="user-avatar-container">
          <IonAvatar className="user-pro-pic-container">
            {usersData.photoURL ? (
              <IonImg
                className="shadow-drop-2-center fade-in-fwd"
                src={usersData.photoURL}
              />
            ) : (
              <IonImg src="assets/images/default-user.jpg" />
            )}
          </IonAvatar>
          <IonRow className="name-row">
            <IonLabel className="user-profile-email">
              {usersData.email}
            </IonLabel>
          </IonRow>
        </IonCard>
        <IonCard className="media-container">
          <>
            <IonRow className="media-label">Media</IonRow>
            <Swiper
              slidesPerView={5}
              freeMode={true}
              scrollbar={true}
              centeredSlides={true}
              mousewheel={true}
              modules={[FreeMode, Scrollbar, Mousewheel]}
              className="mySwiper"
            >
              {chatMedia.map((image) => {
                return (
                  <SwiperSlide key={image.id}>
                    <IonAvatar className="media">
                      <IonImg src={image.image}></IonImg>
                    </IonAvatar>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        </IonCard>
        <IonGrid className="userprofile-grid">
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Email</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={atOutline} />
              {usersData.email}
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Phone Number</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={callOutline} />
              +91-9999999999
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Password</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={lockClosedOutline} />
              *************
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Date of Birth</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={calendarNumberOutline} />
              DD-MON-19XX
            </IonLabel>
          </IonRow>
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">About</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={informationCircleOutline} />
              Hi, this is about me!
            </IonLabel>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
