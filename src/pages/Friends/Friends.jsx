import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import './Friends.css';

const Friends = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Friends</IonTitle>
          <IonIcon icon={ellipsisVertical} slot="end"></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Friends</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Friends page" />
      </IonContent>
    </IonPage>
  );
};

export default Friends;
