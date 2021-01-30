import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB6ScoGIcI768a7p3Wr3xBtnt32Huaej7g",
  authDomain: "digipakistan-287a6.firebaseapp.com",
  projectId: "digipakistan-287a6",
  storageBucket: "digipakistan-287a6.appspot.com",
  messagingSenderId: "697825991647",
  appId: "1:697825991647:web:a132f1b9c6e9a6740f426a",
  measurementId: "G-X5PGSP5T7G",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
