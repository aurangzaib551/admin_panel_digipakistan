import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import fbConfig from "./config/fbConfig";

const store = createStore(
  rootReducer,
  compose(
    reactReduxFirebase(fbConfig, {
      attachAuthIsReady: true,
      useFirestoreForProfile: true,
      userProfile: "users",
    }),
    reduxFirestore(fbConfig),
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore,
      })
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
