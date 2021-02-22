import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "./loader/loader";
const LogIn = lazy(() => import("./pages/logIn"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const SMS = lazy(() => import("./pages/sms"));
const NotFound = lazy(() => import("./pages/notFound"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact component={LogIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/sms" component={SMS} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export default App;
