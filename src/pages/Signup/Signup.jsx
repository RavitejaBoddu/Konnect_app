import {
  IonButton,
  IonCard,
  IonContent,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import "./Signup.css";
import { toastController } from "@ionic/core";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { createUser } = UserAuth();

  let router = useIonRouter();

  const handleToast = async (msg) => {
    const toast = await toastController.create({
      color: "light",
      position: "top",
      duration: 2000,
      message: msg,
      translucent: false,
      showCloseButton: true,
    });
    await toast.present();
  };

  const handleSignup = async (e) => {
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
          router.push("/home");
        } catch (e) {
          alert(e.message);
        }
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="signup-page">
        <IonCard className="logo-container">
          <IonImg className="sp-logo" src="assets/images/logo.png" />
          <IonLabel className="sp-logo-text">Konnect.</IonLabel>
        </IonCard>
        <IonLabel className="hello-text">Hello there.</IonLabel>
        <IonCard className="sp-input-container">
          <IonInput
            className="sp-input"
            type="text"
            placeholder="Name"
            onIonChange={(e) => setName(e.detail.value)}
            required
          ></IonInput>
          <IonInput
            className="sp-input"
            type="text"
            placeholder="Email ID"
            onIonChange={(e) => setEmail(e.detail.value)}
            required
          ></IonInput>
          <IonInput
            className="sp-input"
            type="password"
            placeholder="Password"
            onIonChange={(e) => setPassword(e.detail.value)}
            required
          ></IonInput>
        </IonCard>
        <IonButton
          className="sp-signup-btn"
          shape="round"
          color="light"
          onClick={(e) => handleSignup()}
        >
          <IonLabel className="sp-signup-btn-text ion-text-capitalize">
            Signup
          </IonLabel>
        </IonButton>
        <IonLabel className="account-text">Already have an account?</IonLabel>
        <IonButton
          className="sp-login-btn"
          fill="clear"
          color="dark"
          routerLink="/login"
        >
          <IonLabel className="sp-login-btn-text ion-text-capitalize">
            Login
          </IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
