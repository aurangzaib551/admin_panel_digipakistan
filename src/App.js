import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "./loader/loader";
const LogIn = lazy(() => import("./pages/logIn"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const ApplicantsData = lazy(() => import("./pages/applicantsData"));
const NotFound = lazy(() => import("./pages/notFound"));
const RegisteredUsers = lazy(() => import("./pages/registeredUsers"));
const Edit = lazy(() => import("./pages/edit"));
const UploadLecture = lazy(() => import("./pages/uploadLecture"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact component={LogIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/applicants" component={ApplicantsData} />
        <Route path="/registeredUser" component={RegisteredUsers} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/uploadLecture" component={UploadLecture} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export default App;
