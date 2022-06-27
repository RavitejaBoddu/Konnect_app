import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import {logoGoogle, logoFacebook, logoApple} from 'ionicons/icons'


const Login = () => {
    return(
        <IonPage>
          <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonImg src='assets/images/login-img.jpg'/>
            <IonLabel >Login</IonLabel>
            <IonItem>
            <IonInput  placeholder="Email ID"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput  placeholder="Password"></IonInput>
          </IonItem>
          <IonItem  lines='none' routerLink="/home">
          <IonButton>Login</IonButton>
          </IonItem>
          
          <IonItem lines='none' className='ion-text-center'>
          <IonLabel>Or, Login with</IonLabel>
          </IonItem>
          <IonItem lines='none' >
          <IonIcon size='large' icon={logoGoogle} />
          <IonIcon size='large' icon={logoFacebook} />
          <IonIcon size='large' icon={logoApple} />
          </IonItem>
          <IonItem lines='none' className='ion-text-center'>
          <IonLabel>Don't have an account?</IonLabel>
          <IonButton routerLink="/signup">Signup</IonButton>
          </IonItem>
          </IonContent>
        </IonPage>
    )
};

export default Login