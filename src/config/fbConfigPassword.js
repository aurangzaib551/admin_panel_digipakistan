import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCG_rjZjgz2CQ_EIG7J5stYqNPy4plEk_A",
  authDomain: "enter-f18fb.firebaseapp.com",
  databaseURL: "https://enter-f18fb-default-rtdb.firebaseio.com",
  projectId: "enter-f18fb",
  storageBucket: "enter-f18fb.appspot.com",
  messagingSenderId: "704269639449",
  appId: "1:704269639449:web:39d0173437e95fbbaf2f88",
};
// Initialize Firebase
export const password = firebase.initializeApp(firebaseConfig, "Passwords12");
