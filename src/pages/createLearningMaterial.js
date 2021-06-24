import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import { Redirect, useHistory } from "react-router-dom";
import Navbar from "../components/dashboard/nav";
import CreateLearning from "../components/create_learning_material/createLearning";
import Loader from "../loader/loader";

const CreateLearningMaterial = ({ uid, signOut, admin, getData }) => {
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
      <CreateLearning />
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
)(CreateLearningMaterial);
