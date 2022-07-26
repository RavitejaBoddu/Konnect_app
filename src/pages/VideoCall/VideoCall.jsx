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
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { arrowBackOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../firebase";
import './VideoCall.css'


      // Initialize WebRTC
      const servers = {
        iceServers: [
            {
                urls: [
                  "stun:stun1.l.google.com:19302",
                  "stun:stun2.l.google.com:19302",
                  "stun:stun.services.mozilla.com",
                ],
            },
        ],
        iceCandidatePoolSize: 10,
    };
    
const pc = new RTCPeerConnection(servers);

const VideoCall = () => {
  let router = useIonRouter();
  const { id } = useParams();
  const [callInput, setCallInput] = useState()
  const [callId, setCallId] = useState()

  const localRef = useRef(null);
  const remoteRef = useRef(null);
  let localStream = null;
  let remoteStream = null;

  // const localVideo = document.getElementById('local-video');
  // const remoteVideo = document.getElementById('remote-video');

  useIonViewWillEnter(()=> {
    getLocalStream();
  })


  const getLocalStream = async() => {

    const localVideo = document.getElementById('local-video');
    const remoteVideo = document.getElementById('remote-video');

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
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
const callsDoc = await addDoc(collection(db, "calls"),{})

setCallInput(callsDoc.id);
console.log(callsDoc.id);

const callDocRef = doc(db, "cities", callsDoc.id)
const offerCandidates = collection(db,"calls", callsDoc.id, "offerCandidates");
const answerCandidates = collection(db,"calls", callsDoc.id, "answerCandidates");

// Get candidates for caller, save to db
pc.onicecandidate = async (event) => {
  let candidate = event.candidate.toJSON()
  if (event.candidate) {
    await addDoc(offerCandidates, candidate);
  }
};

 // Create offer
 const offerDescription = await pc.createOffer();
 
 const offer = {
   sdp: offerDescription.sdp,
   type: offerDescription.type,
 };

 await setDoc(doc(db,"calls", callsDoc.id), { offer });

 await pc.setLocalDescription(offerDescription);


//   Listen for remote answer
  onSnapshot(callDocRef, (snapshot) => {
    const data = snapshot.data();
    if (data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // When answered, add candidate to peer connection
    onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
}

const answerCall = async() => {

  const callsDocRef =doc(db, "calls", callId);
    const offerCandidates = collection(db,"calls", callId, "offerCandidates");
    const answerCandidates = collection(db,"calls", callId, "answerCandidates");
   
   
   // Get candidates for caller, save to db
   pc.onicecandidate = async (event) => {
    let candidate = event.candidate.toJSON()
    candidate && await addDoc(answerCandidates, candidate);
  };

 let callData;
  const callsDocSnap = await getDoc(callsDocRef);
  if(callsDocSnap.exists()){
    callData = callsDocSnap.data()
  }

  const offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await updateDoc(callsDocRef,{ answer });

  onSnapshot(offerCandidates,(snapshot) => {
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
              value={callId}
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
