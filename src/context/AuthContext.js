import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, Timestamp, updateDoc, } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [userList, setUserList] = useState([]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const addData = async (auth, name, email) => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      name: name,
      email: email,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline:false,
    });
  };

  const updateStatus = async (auth, status) => {
    const updateRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(updateRef, {
      isOnline : status
  })
  }


  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };
  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };
  const facebookSignIn = () => {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      let user = currentUser;
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        login,
        loggedIn,
        setLoggedIn,
        googleSignIn,
        facebookSignIn,
        addData,
        updateStatus,
        userList,
        setUserList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
