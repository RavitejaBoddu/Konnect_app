import { IonButton, IonCard, IonContent, IonImg, IonInput, IonLabel, IonPage, useIonRouter } from '@ionic/react';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { toastController, alertController } from '@ionic/core';
import './Login.css'


const Login = () => {
  // const tabBar = document.getElementById('tab-bar');
  // if (tabBar !== null) {
  //   tabBar.style.display = 'none';
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = UserAuth();

  let router = useIonRouter();
    const handleAlert = async(msg)=> {
      const alert = await alertController.create({
        message: msg,
        buttons: ['Ok'],
      });

      await alert.present();
    }

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

  const handleLogin = async () => {
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
          await login(email, password);
          router.push("/home");
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

    return(

        <IonPage>
          <IonContent fullscreen className='login-page'>
          <IonImg className="logo" src="assets/images/logo.png" />
          <IonLabel className="logo-text">Konnect.</IonLabel>
          <IonLabel className="welcome-text">Welcome Back.</IonLabel>
          <IonCard className='lp-input-container'>
          <IonInput className='lp-input' type="text" placeholder='Email ID' onIonChange={e => setEmail(e.detail.value)} required />
          <IonInput className='lp-input' type="password" placeholder='Password' onIonChange={e => setPassword(e.detail.value)} required />
          </IonCard>
          <IonLabel className="forgot-text">Forgot Password?</IonLabel>
          <IonButton className='lp-login-btn' shape="round" color="light" onClick={(e) => handleLogin()}><IonLabel className='lp-login-btn-text ion-text-capitalize'>Login</IonLabel></IonButton>
          <IonLabel className="account-text">Dont have an account?</IonLabel>
          <IonButton className="lp-signup-btn" fill='clear' color="dark" routerLink="/signup" >
          <IonLabel className='lp-signup-btn-text ion-text-capitalize'>Signup</IonLabel>
          </IonButton>
          </IonContent>
        </IonPage>
    )
};

export default Login