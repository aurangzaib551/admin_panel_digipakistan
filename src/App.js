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
const Teachers = lazy(() => import("./pages/teachers"));
const MarketingEdit = lazy(() => import("./pages/marketingEdit"));
const View = lazy(() => import("./pages/view"));
const SN = lazy(() => import("./pages/sendNotification"));
const Ratings = lazy(() => import("./pages/ratings"));
const MarketingWithDrawalRequests = lazy(() =>
  import("./pages/marketingWithDrawalRequests")
);
const MarketingUsers = lazy(() => import("./pages/marketingUsers"));
const CAL = lazy(() => import("./pages/createAssignmentLink"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact component={LogIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/applicants" component={ApplicantsData} />
        <Route path="/registeredUser" component={RegisteredUsers} />
        <Route path="/teachers" component={Teachers} />
        <Route path="/marketing" component={MarketingWithDrawalRequests} />
        <Route path="/marketingUsers" component={MarketingUsers} />
        <Route path="/ratings" component={Ratings} />
        <Route path="/sendNotification" component={SN} />
        <Route path="/createAssignmentLink" component={CAL} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/view/:id" component={View} />
        <Route
          path="/marketingEdit/:id/:name/:amount"
          component={MarketingEdit}
        />
        <Route path="/uploadLecture" component={UploadLecture} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
};

export default App;
