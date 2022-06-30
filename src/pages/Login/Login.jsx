import { IonButton, IonContent, IonImg, IonInput, IonLabel, IonPage } from '@ionic/react';
import './Login.css'


const Login = () => {
  const tabBar = document.getElementById('tab-bar');
  if (tabBar !== null) {
    tabBar.style.display = 'none';
  }
    return(
        <IonPage>
          <IonContent fullscreen className='login-page'>
          <IonImg className="logo" src="assets/images/logo.png" />
          <IonLabel className="logo-text">Konnect.</IonLabel>
          <IonLabel className="welcome-text">Welcome Back.</IonLabel>
          <IonInput className='lp-email-input' placeholder='Email ID'></IonInput>
          <IonInput className='lp-password-input' placeholder='Password'></IonInput>
          <IonLabel className="forgot-text">Forgot Password?</IonLabel>
          <IonButton className='lp-login-btn' shape="round" color="light" routerLink="/home"><IonLabel className='lp-login-btn-text ion-text-capitalize'>Login</IonLabel></IonButton>
          <IonLabel className="account-text">Dont have an account?</IonLabel>
          <IonButton className="lp-signup-btn" fill='clear' color="dark" routerLink="/signup" >
          <IonLabel className='lp-signup-btn-text ion-text-capitalize'>Signup</IonLabel>
          </IonButton>
          </IonContent>
        </IonPage>
    )
};

export default Login