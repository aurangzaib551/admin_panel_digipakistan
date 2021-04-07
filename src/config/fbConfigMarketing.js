import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB410RtICmZy9y1XXbWVfh5FaaDFYkFP_o",
  authDomain: "affiliate-withdrawal-request.firebaseapp.com",
  databaseURL:
    "https://affiliate-withdrawal-request-default-rtdb.firebaseio.com",
  projectId: "affiliate-withdrawal-request",
  storageBucket: "affiliate-withdrawal-request.appspot.com",
  messagingSenderId: "473849009511",
  appId: "1:473849009511:web:431ba506024125a85dcbc2",
};
// Initialize Firebase
export const marketing = firebase.initializeApp(firebaseConfig, "Marketing");
