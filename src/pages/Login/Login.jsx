import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  isPlatform,
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
// import { logoGoogle, logoFacebook, alertOutline } from "ionicons/icons";
import "../../theme/Login_Signup.css";
import { auth } from "../../firebase";
import { logoFacebook, logoGoogle } from "ionicons/icons";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [show, dismiss] = useIonLoading();

  const { login, logout, setGoogleUser, setIsGoogleLogin, facebookSignIn, updateStatus, setUser, addGoogleData, googleSignIn } =
    UserAuth();

  let router = useIonRouter();
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
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

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

  const handleLogin = async (e) => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    try {
      if (email == null || email === "") {
        const msg = "Please enter your email";
        handleToast(msg);
      } else if (password == null || password === "") {
        const msg = "Please enter your password";
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
          show({
            message: "Logging in please wait...",
            duration: 5000,
            spinner: "circular",
            cssClass: "lp-sp-spinner",
            animated: true,
            keyboardClose: true,
            mode: "ios",
          });
          await login(email, password);
          if (auth.currentUser.emailVerified) {
            await updateStatus(auth, true);
            dismiss();
            const msg = "You have Logged in successfully";
            handleToast(msg);
            clearInputs();
            router.push("/home");
          } else {
            dismiss();
            const msg = "Please complete the verification and try to login.";
            handleAlert(msg);
            logout();
            clearInputs();
          }
          clearInputs();
        } catch (e) {
          dismiss();
          const msg = JSON.stringify(e.message);
          try {
            if (msg.includes("user-not-found")) {
              handleAlert(
                "User not found, please enter correct email address / If already signed up complete the verification process."
              );
              clearInputs();
            } else if (msg.includes("wrong-password")) {
              handleAlert(
                "Wrong password entered, Please enter the correct password"
              );
              setPassword("");
              clearInputs();
            } else {
              dismiss();
              handleAlert(msg);
              clearInputs();
            }
          } catch (e) {
            dismiss();
            handleAlert(e.message);
            clearInputs();
          }
        }
      }
    } catch (e) {
      dismiss();
      const msg = e.message;
      handleAlert(msg);
      clearInputs();
    }
  };

  const handleMobileGoogleSignIn = async () => {
    try {
      show({
      message: "Logging in please wait...",
      duration: 5000,
      spinner: "circular",
      cssClass: "lp-sp-spinner",
      animated: true,
      keyboardClose: true,
      mode: "ios",
    });
      GoogleAuth.initialize();
      const result = await GoogleAuth.signIn();
      addGoogleData(result.id, result.displayName, result.email, result.imageUrl);
      setUser(result);
      setGoogleUser(result);
      setIsGoogleLogin(true)
      dismiss();
      const msg = "You have Logged in successfully";
      handleToast(msg);
      if (result) {
        router.push("/home");
      }
    } catch (error) {
      handleAlert(error.message);
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/home");
    } catch (error) {
      handleAlert(error.message);
    }
  };

//   const handleMobileFacebookSignIn = async () => {
//     try {
//       const FACEBOOK_PERMISSIONS = [
//         'email',
//         'user_birthday',
//         'user_photos',
//         'user_gender',
//       ];
//       const result = await FacebookLogin.login( FACEBOOK_PERMISSIONS) 
//       if (result.accessToken) {
//   // Login successful.
//   router.push("/home");
//   console.log(`Facebook access token is ${result.accessToken.token}`);
// }  
//     } catch (error) {
//       handleAlert(error.message);
//     }
//   };

  // const handleFacebookSignIn = async () => {
  //   try {
  //     await facebookSignIn();
  //     router.push("/home");
  //   } catch (error) {
  //     handleAlert(error.message);
  //   }
  // };

  return (
    <IonPage>
      <IonContent fullscreen className="lp-sp-page">
        <IonGrid className="lp-sp-content">
          <IonRow className="logo-container">
            <IonImg className="logo" src="assets/images/logo.png" />
            <IonLabel className="logo-text">Konnect.</IonLabel>
          </IonRow>
          <IonRow className="lp-sp-heading-container">
            <IonLabel className="lp-sp-heading">Welcome Back.</IonLabel>
          </IonRow>
          <IonRow className="input-container">
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
            <IonItem lines="none" className="forgot-txt-container">
              <IonLabel>Forgot Password?</IonLabel>
            </IonItem>
          </IonRow>
          <IonRow className="lp-sp-btn-container">
            <IonCol size="auto">
              <IonButton
                className="lp-sp-btn"
                shape="round"
                color="white-smoke"
                onClick={(e) => handleLogin()}
              >
                <IonLabel className="lp-sp-btn-text ion-text-capitalize">
                  Login
                </IonLabel>
              </IonButton>
            </IonCol>
            <IonLabel style={{marginTop: "15px"}}>(or)</IonLabel>
            <IonCol className="alternate-logins">
              {isPlatform('android') ? <IonButton fill="outline" color="white" shape="round" className="alternate-icon" onClick={(e)=>{handleMobileGoogleSignIn()}}><IonIcon icon={logoGoogle} color="white"  /></IonButton> :
              <IonButton fill="outline" color="white" shape="round" className="alternate-icon" onClick={(e)=>{handleGoogleSignIn()}}><IonIcon icon={logoGoogle} color="white"  /></IonButton>}
              {/* {isPlatform('android') ? <IonButton fill="outline" color="white" shape="round" className="alternate-icon" onClick={(e)=>{handleMobileFacebookSignIn()}}><IonIcon icon={logoFacebook} color="white"  /></IonButton> :
              <IonButton fill="outline" color="light" shape="round" className="alternate-icon" onClick={(e)=>{handleFacebookSignIn()}} ><IonIcon icon={logoFacebook} color="white" /></IonButton>}             */}
            </IonCol>
          </IonRow>
          <IonRow class="lp-sp-switch-container">
            <IonLabel className="lp-account-text">
              Dont have an account?
            </IonLabel>
            <IonButton
              className="lp-sp-switch-btn"
              fill="clear"
              color="dark"
              routerLink="/signup"
              onClick={() => {
                clearInputs();
              }}
            >
              <IonLabel className="lp-sp-switch-btn-text ion-text-capitalize">
                Signup
              </IonLabel>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
