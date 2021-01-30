import { combineReducers } from "redux";
import { firebaseReducer, firestoreReducer } from "react-redux-firebase";
import authReducer from "./authReducer";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
});
