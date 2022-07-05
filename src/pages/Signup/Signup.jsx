import {
  IonButton,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  useIonAlert,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import "../../theme/Login_Signup.css";
import { auth } from "../../firebase";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { alertOutline } from "ionicons/icons";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  const { createUser, logout, addData } = UserAuth();

  let router = useIonRouter();

  const handleToast = async (msg) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: "dark3",
      mode: "ios",
      icon: alertOutline,
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

  const handleSignup = async () => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    try {
      if (name == null || name === "") {
        const msg = "Please enter your name";
        handleToast(msg);
      } else if (email == null || email === "") {
        const msg = "Please enter your email";
        handleToast(msg);
      } else if (password == null || password === "") {
        const msg = "please enter the password";
        handleToast(msg);
      } else if (password.length < 6) {
        const msg = "Password must be at least 6 characters long";
        handleToast(msg);
      } else if (
        atposition < 1 ||
        dotposition < atposition + 2 ||
        dotposition + 2 >= email.length
      ) {
        const msg = "Please enter a valid email address";
        handleToast(msg);
      } else {
        try {
          await createUser(email, password);
          await updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              console.log(auth.currentUser.displayName);
            })
            .catch((error) => {
              handleAlert(error.message);
            });
          await addData(auth, name, email);
          sendEmailVerification(auth.currentUser).then(() => {
            const msg =
              "A verification link has been sent to your email, please complete the verification and login.";
            handleAlert(msg);
          });
          logout();
          setName("");
          setEmail("");
          setPassword("");
          router.push("/login");
        } catch (e) {
          const msg = e.message;
          handleAlert(msg);
        }
      }
    } catch (e) {
      const msg = e.message;
      handleAlert(msg);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="lp-sp-page">
        <IonGrid className="lp-sp-content">
          <IonRow className="logo-container">
            <IonImg className="logo" src="assets/images/logo.png" />
            <IonLabel className="logo-text">Konnect.</IonLabel>
          </IonRow>
          <IonRow className="lp-sp-heading-container">
            <IonLabel className="lp-sp-heading">Hello there.</IonLabel>
          </IonRow>
          <IonRow className="input-container">
            <IonInput
              className="input"
              type="text"
              placeholder="Name"
              value={name}
              onIonChange={(e) => setName(e.detail.value)}
              required
            ></IonInput>
            <IonInput
              className="input"
              type="text"
              placeholder="Email ID"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
              required
            />
            <IonInput
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
              required
            />
          </IonRow>
          <IonRow className="lp-sp-btn-container">
            <IonButton
              className="lp-sp-btn"
              shape="round"
              color="white-smoke"
              onClick={(e) => handleSignup()}
            >
              <IonLabel className="lp-sp-btn-text ion-text-capitalize">
                Signup
              </IonLabel>
            </IonButton>
          </IonRow>
          <IonRow class="lp-sp-switch-container">
            <IonLabel className="account-text">
              Already have an account?
            </IonLabel>
            <IonButton
              className="lp-sp-switch-btn"
              fill="clear"
              color="dark"
              routerLink="/login"
            >
              <IonLabel className="lp-sp-switch-btn-text ion-text-capitalize">
                Login
              </IonLabel>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
