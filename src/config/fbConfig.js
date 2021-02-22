import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMDIoylZL0ay0li660VDuEZqa-RJMZomY",
  authDomain: "digipakistan-d4bb3.firebaseapp.com",
  projectId: "digipakistan-d4bb3",
  storageBucket: "digipakistan-d4bb3.appspot.com",
  messagingSenderId: "816835130908",
  appId: "1:816835130908:web:7145d1e5e16db252c791d9",
  measurementId: "G-137HNZH4XR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
