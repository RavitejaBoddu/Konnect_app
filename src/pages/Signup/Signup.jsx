import { IonButton, IonContent, IonImg, IonInput, IonLabel, IonPage } from '@ionic/react';
import { useState } from 'react';
import './Signup.css'


const Signup = () => {
  return (
    <IonPage>
           <IonContent fullscreen className='signup-page'>
          <IonImg className="logo" src="assets/images/logo.png" />
          <IonLabel className="logo-text">Konnect.</IonLabel>
          <IonLabel className="hello-text">Hello there.</IonLabel>
          <IonInput className='sp-name-input' placeholder='Name'></IonInput>
          <IonInput className='sp-email-input' placeholder='Email ID'></IonInput>
          <IonInput className='sp-password-input' placeholder='Password'></IonInput>
          <IonButton className='sp-signup-btn' shape="round" color="light"  routerLink="/home"><IonLabel className='sp-signup-btn-text ion-text-capitalize'>Signup</IonLabel></IonButton>
          <IonLabel className="account-text">Already have an account?</IonLabel>
          <IonButton className="sp-login-btn" fill='clear' color="dark" routerLink="/login" >
          <IonLabel className='sp-login-btn-text ion-text-capitalize'>Login</IonLabel>
          </IonButton>
          </IonContent>
  </IonPage>
  )
}

export default Signup