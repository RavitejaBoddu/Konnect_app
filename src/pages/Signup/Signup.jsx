import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logoApple, logoFacebook, logoGoogle } from 'ionicons/icons';

const Signup = () => {
  return (
    <IonPage>
    <IonHeader>
  <IonToolbar>
    <IonTitle>Signup</IonTitle>
  </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonImg src='assets/images/signup-img.jpg'/>
      <IonLabel >Signup</IonLabel>
      <IonItem>
      <IonInput  placeholder="Full name"></IonInput>
    </IonItem>
      <IonItem>
      <IonInput  placeholder="Email ID"></IonInput>
    </IonItem>
    <IonItem>
      <IonInput  placeholder="Password"></IonInput>
    </IonItem>
    <IonItem  lines='none' routerLink="/home">
    <IonButton>Signup</IonButton>
    </IonItem>
    
    <IonItem lines='none' className='ion-text-center'>
    <IonLabel>Or, signup with</IonLabel>
    </IonItem>
    <IonItem lines='none' >
    <IonIcon size='large' icon={logoGoogle} />
    <IonIcon size='large' icon={logoFacebook} />
    <IonIcon size='large' icon={logoApple} />
    </IonItem>
    <IonItem lines='none' className='ion-text-center'>
    <IonLabel>Already have an Account 
    </IonLabel>
    <IonButton routerLink="/login">Login</IonButton>
    </IonItem>
    </IonContent>
  </IonPage>
  )
}

export default Signup