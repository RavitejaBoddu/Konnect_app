import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { arrowBackOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../firebase";
import './VideoCall.css'


const VideoCall = () => {

      // Initialize WebRTC
  const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

  let router = useIonRouter();
  const { id } = useParams();
  const [callInput, setCallInput] = useState()
  const [callId, setCallId] = useState()

  const localRef = useRef(null);
  const remoteRef = useRef(null);
  let localStream = null;
  let remoteStream = null;

  const localVideo = document.getElementById('local-video');
  const remoteVideo = document.getElementById('remote-video');

  useIonViewWillEnter(()=> {
    getLocalStream();
  })


  const getLocalStream = async() => {

    const localVideo = document.getElementById('local-video');
    const remoteVideo = document.getElementById('remote-video');
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

   // Pull tracks from remote stream, add to video stream
   pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  localVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;
}

//creating an offer
const createCall = async () => {

//   const callDoc = db.collection('calls').doc();
const callDoc =collection(db, "calls")

//   setCallInput(callDoc.id);

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

   // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  const docRef = await addDoc(collection(db, "calls"), 
    { offer }
  );

  setCallInput(docRef.id);

  const callDocRef = doc(db, "cities", docRef.id)

  const offerCandidates =collection(callDocRef, "offerCandidates");
  const answerCandidates = collection(callDocRef, "answerCandidates");

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    let candidate = event.candidate.toJSON()
    candidate && addDoc(collection(db, "calls", docRef.id, "offerCandidates"), 
    { offer }
  );
  };


//   Listen for remote answer
 onSnapshot(callDocRef, (snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
}
console.log(callInput);

const answerCall = async() => {
    const callDoc = db.collection('calls').doc(callInput);
  const answerCandidates = callDoc.collection('answerCandidates');
  const offerCandidates = callDoc.collection('offerCandidates');

  pc.onicecandidate = (event) => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };

  const callData = (await callDoc.get()).data();

  const offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await callDoc.update({ answer });

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);
      if (change.type === 'added') {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};

  const goBack = () => {
    router.push(router.push(`/chat/${id}`, "back"));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="video-call-page">
      <IonItem className="video-call-back-btn">
          <IonButtons slot="start">
            <IonButton
              onClick={(e) => {
                goBack();
              }}
              className="back-button"
            >
              <IonIcon icon={arrowBackOutline} size="large" color="white" />
            </IonButton>
          </IonButtons>
        </IonItem>
        <IonCard className="video-container">
            <video id="remote-video" className="video-remote" autoPlay playsInline >
            </video>
            <video id="local-video" className="video-self" autoPlay playsInline >
            </video>
        </IonCard>
        <IonRow className="video-call-btns">
        <IonButton color="primary" onClick={(e) => createCall()}>
          Connect
        </IonButton>
        <IonInput
              className="input"
              type="text"
              placeholder="Enter Call Id"
              value={callInput}
              onIonChange={(e) => setCallId(e.detail.value)}
              required
            />
        <IonButton color="danger" onClick={(e) => answerCall()}>
          Join Call
        </IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default VideoCall;
