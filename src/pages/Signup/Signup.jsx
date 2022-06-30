import { IonButton, IonCard, IonContent, IonImg, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';
import './Signup.css'


const Signup = () => {
  return (
    <IonPage>
      <IonContent fullscreen className='signup-page'>
        <IonCard className='logo-container'>
          <IonImg className="sp-logo" src="assets/images/logo.png" />
          <IonLabel className="sp-logo-text">Konnect.</IonLabel>
        </IonCard>

        <IonLabel className="hello-text">Hello there.</IonLabel>
        <IonCard className='input-container'>
          <IonInput className='sp-name-input' placeholder='Name'></IonInput>
          <IonInput className='sp-email-input' placeholder='Email ID'></IonInput>
          <IonInput className='sp-password-input' placeholder='Password'></IonInput>
        </IonCard>
        <IonButton className='sp-signup-btn' shape="round" color="light" routerLink="/home"><IonLabel className='sp-signup-btn-text ion-text-capitalize'>Signup</IonLabel></IonButton>
        <IonLabel className="account-text">Already have an account?</IonLabel>
        <IonButton className="sp-login-btn" fill='clear' color="dark" routerLink="/login" >
          <IonLabel className='sp-login-btn-text ion-text-capitalize'>Login</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Signup