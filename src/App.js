import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "./loader/loader";
const HomePage = lazy(() => import("./pages/homePage"));
const NotFound = lazy(() => import("./pages/notFound"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export default App;
