import {
  IonAvatar,
  IonCard,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { UserAuth } from "../../context/AuthContext";

const Header = (props) => {
  const { heading } = props;

  const { user } = UserAuth();
  let router = useIonRouter();

  const goToProfile = () => {
    router.push("/home/profile");
  };
  return (
    <IonHeader>
      <IonToolbar className="chats-toolbar" color="white">
        <IonCard className="chats-header" lines="none">
          <IonLabel className="chats-heading tracking-in-expand">
            {heading}
          </IonLabel>
          <IonAvatar className="profile-pic">
            {user.photoURL ? (
              <IonImg
                src={user.photoURL}
                onClick={(e) => {
                  goToProfile();
                }}
              />
            ) : (
              <IonImg
                src="assets/images/user.png"
                onClick={(e) => {
                  goToProfile();
                }}
              />
            )}
          </IonAvatar>
          <IonIcon
            icon={ellipsisVertical}
            className="chats-vertical-dots"
            size="large"
            color="blue"
          />
        </IonCard>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
