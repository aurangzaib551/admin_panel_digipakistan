import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkecpvaDKfPlnUkzSqF5sSIXFjUqEpHWQ",
  authDomain: "digipakistan-affiliate-program.firebaseapp.com",
  databaseURL:
    "https://digipakistan-affiliate-program-default-rtdb.firebaseio.com",
  projectId: "digipakistan-affiliate-program",
  storageBucket: "digipakistan-affiliate-program.appspot.com",
  messagingSenderId: "1083284189336",
  appId: "1:1083284189336:web:8b3bfaaf7360f0637be0ed",
  measurementId: "G-502Y47Y5ZR",
};
// Initialize Firebase
export const marketingUsers = firebase.initializeApp(
  firebaseConfig,
  "Marketing Users"
);
