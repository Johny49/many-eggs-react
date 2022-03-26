import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  //... ADD CONFIG HERE
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
  auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup, // TODO: revisit this one
  GoogleAuthProvider,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  db,
  ref,
  set,
  onValue,
};
