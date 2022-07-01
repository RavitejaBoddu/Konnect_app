// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-iu2liVCjy1Oj-ch_ZD4KBMP4u2gInN4",
  authDomain: "konnect-app-6c05f.firebaseapp.com",
  projectId: "konnect-app-6c05f",
  storageBucket: "konnect-app-6c05f.appspot.com",
  messagingSenderId: "987108446678",
  appId: "1:987108446678:web:a6c693bd0e905d6d625477",
  measurementId: "G-0KMN5NXRXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export default app