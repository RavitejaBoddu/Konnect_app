import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
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
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { updateProfile } from "firebase/auth";
import {
  qrCodeOutline,
  arrowBackOutline,
  atOutline,
  callOutline,
  lockClosedOutline,
  calendarNumberOutline,
  informationCircleOutline,
  camera,
  trash,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { closeCircleOutline, checkmarkCircleOutline } from "ionicons/icons";
import "./Profile.css";
import { storage } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const Profile = () => {
  const { user, hideTabs } = UserAuth();
  const user_id = user.uid;
  const [uname, setUname] = useState(user.displayName);
  const [isUpdate, setIsUpdate] = useState(false);
  const [show, dismiss] = useIonLoading();
  const [img, setImg] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [deleteImg, setDeleteImg] = useState(false);

  let router = useIonRouter();
  const [presentAlert] = useIonAlert();

  const [present] = useIonToast();

  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUserProfile(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (userProfile.avatarPath) {
            await deleteObject(ref(storage, userProfile.avatarPath));
          }
          const snap = await uploadBytesResumable(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, "users", user.uid), {
            photoURL: url,
            avatarPath: snap.ref.fullPath,
          });
          await updateProfile(auth.currentUser, {
            photoURL: url,
          }).catch((error) => {
            handleAlert(error.message);
          });
          setImg("");
        } catch (err) {
          handleAlert(err.message);
        }
      };
      uploadImg();
    }
    if (deleteImg) {
      deleteImage();
    }
  }, [img, deleteImg]);

  const deleteImage = async () => {
    try {
      await deleteObject(ref(storage, userProfile.avatarPath));

      await updateDoc(doc(db, "users", user.uid), {
        photoURL: "",
        avatarPath: "",
      });
      await updateProfile(auth.currentUser, {
        photoURL: "",
      }).catch((error) => {
        handleAlert(error.message);
      });
      setDeleteImg(false);
      // window.location.reload()
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleToast = (msg) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: "dark3",
      mode: "ios",
    });
  };

  const handleAlert = async (msg) => {
    presentAlert({
      header: "Alert",
      message: msg,
      buttons: ["OK"],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "lp-sp-alert",
    });
  };

  useIonViewWillEnter(() => hideTabs());

  const handleDelete = async () => {
    presentAlert({
      header: "Delete Profile Picture?",
      buttons: [
        {
          text: "Delete",
          role: "Delete",
          handler: async () => {
            show({
              message: "Deleting...",
              duration: 2000,
              spinner: "circular",
              cssClass: "lp-sp-spinner",
              animated: true,
              keyboardClose: true,
              mode: "ios",
            });
            setDeleteImg(true);
            dismiss();
          },
        },
      ],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "lp-sp-alert",
    });
  };

  const handleUpdate = async () => {
    const userRef = doc(db, "users", user_id);

    try {
      show({
        message: "Updating...",
        duration: 5000,
        spinner: "circular",
        cssClass: "lp-sp-spinner",
        animated: true,
        keyboardClose: true,
        mode: "ios",
      });
      await updateProfile(auth.currentUser, {
        displayName: uname,
      }).catch((error) => {
        handleAlert(error.message);
      });
      await updateDoc(userRef, {
        name: uname,
      });
      handleToast("Name has been Successfully Updated!");
      setIsUpdate(false);
      dismiss();
    } catch (error) {
      dismiss();
      handleAlert(error.message);
    }
  };

  const toggleUpdate = () => {
    setIsUpdate(true);
  };

  const cancelUpdate = () => {
    setIsUpdate(false);
  };
  const handleInput = () => {
    document.getElementById("photo").click();
  };

  const goBack = () => {
    // router.goBack();
    router.push("/home", "back", "pop");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="profile-toolbar">
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
          <IonCard className="chats-header" lines="none">
            <IonLabel className="profile-heading">My Profile</IonLabel>
            <IonIcon
              icon={qrCodeOutline}
              className="chats-vertical-dots"
              size="large"
              color="white"
            />
          </IonCard>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="profile-page">
        <IonCard className="avatar-container">
          <IonAvatar className="pro-pic-container">
            {user.photoURL ? (
              <IonImg
                className="shadow-drop-2-center fade-in-fwd"
                src={user.photoURL}
              />
            ) : (
              <IonImg src="assets/images/default-user.jpg" />
            )}
          </IonAvatar>
          <IonItem lines="none" className="pro-pic-btns">
            <IonIcon
              icon={camera}
              slot="start"
              color="white"
              size="large"
              onClick={(e) => {
                handleInput();
              }}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="photo"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <IonIcon
              icon={trash}
              slot="end"
              color="white"
              size="large"
              onClick={(e) => {
                handleDelete();
              }}
            />
          </IonItem>
        </IonCard>
        <IonGrid className="grid">
          {isUpdate ? (
            <IonRow className="update-row">
              <IonInput
                className="update-input"
                type="text"
                color="dark3"
                placeholder="Enter Name"
                value={uname}
                onIonChange={(e) => setUname(e.detail.value)}
                required
              ></IonInput>
              <IonIcon
                className="update-icon"
                icon={checkmarkCircleOutline}
                size="large"
                color="dark3"
                onClick={(e) => {
                  handleUpdate();
                }}
              />
              <IonIcon
                className="update-icon"
                icon={closeCircleOutline}
                size="large"
                color="dark3"
                onClick={(e) => {
                  cancelUpdate();
                }}
              />
            </IonRow>
          ) : (
            <IonRow className="name-row">
              <IonLabel className="Profile-name">{user.displayName}</IonLabel>
              <IonImg
                src="assets/icon/Edit.svg"
                className="edit-icon"
                onClick={(e) => toggleUpdate()}
              />
            </IonRow>
          )}
          <IonRow className="email-row">
            <IonLabel className="flex-row-label">Email Address</IonLabel>
            <IonLabel className="flex-row-value">
              <IonIcon icon={atOutline} />
              {user.email}
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

export default Profile;
