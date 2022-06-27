import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import './Groups.css';

const Groups = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Groups</IonTitle>
          <IonIcon icon={ellipsisVertical} slot="end"></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Groups</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Groups page" />
      </IonContent>
    </IonPage>
  );
};

export default Groups;
