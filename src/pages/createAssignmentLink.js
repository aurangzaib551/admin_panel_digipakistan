import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import { Redirect, useHistory } from "react-router-dom";
import Navbar from "../components/dashboard/nav";
import CreateAssignmentForm from "../components/create_assignment_link/createAssignment";
import Loader from "../loader/loader";

const CreateAssignmentLink = ({ uid, signOut, admin, getData }) => {
  // Object Destructuring
  const { replace } = useHistory();

  useLayoutEffect(() => {
    if (admin) {
      setTimeout(() => {
        signOut(replace);
      }, 400);
    }
  }, [admin, replace, signOut]);

  if (!uid) return <Redirect to="/" />;

  return getData ? (
    <>
      <Navbar />
      <CreateAssignmentForm />
    </>
  ) : (
    <Loader />
  );
};

const mapStateToProps = (state) => {
  //   console.log(state);
  return {
    uid: state.firebase.auth.uid,
    admin: state.firebase.profile.rollNumber || false,
    getData: state.firebase.profile.name || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (push) => dispatch(signOut(push)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAssignmentLink);
