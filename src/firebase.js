import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC-iu2liVCjy1Oj-ch_ZD4KBMP4u2gInN4",
  authDomain: "konnect-app-6c05f.firebaseapp.com",
  projectId: "konnect-app-6c05f",
  storageBucket: "konnect-app-6c05f.appspot.com",
  messagingSenderId: "987108446678",
  appId: "1:987108446678:web:a6c693bd0e905d6d625477",
  measurementId: "G-0KMN5NXRXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth =getAuth(app);
export const storage = getStorage(app);
export default app