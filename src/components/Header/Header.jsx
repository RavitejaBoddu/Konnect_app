import {
  IonAvatar,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { UserAuth } from "../../context/AuthContext";

const Header = (props) => {
  const { heading, isFriendPage } = props;

  const { user } = UserAuth();
  let router = useIonRouter();

  const goToProfile = () => {
    router.push("/home/profile");
  };
  const handleNewChat = () => {
    router.push("/home/friends");
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
          {isFriendPage ? (
            <></>
          ) : (
            <>
              <IonButton
                className="header-popover-btn"
                id="header-popover-btn"
                fill="clear"
              >
                <IonIcon
                  icon={ellipsisVertical}
                  className="chats-vertical-dots"
                  size="large"
                  color="blue"
                />
              </IonButton>
              <IonPopover
                className="header-popover"
                trigger="header-popover-btn"
                dismiss-on-select="true"
                size="auto"
                mode="md"
                alignment="start"
                animated="true"
              >
                <IonContent>
                  <IonList className="chatpage-popover-list">
                    <IonItem
                      lines="none"
                      button="true"
                      className="chatpage-popover-item"
                      detail="false"
                      onClick={(e) => {
                        handleNewChat();
                      }}
                    >
                      New chat
                    </IonItem>
                    <IonItem
                      lines="none"
                      button="true"
                      className="chatpage-popover-item"
                      detail="false"
                    >
                      Delete
                    </IonItem>
                  </IonList>
                </IonContent>
              </IonPopover>
            </>
          )}
        </IonCard>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
