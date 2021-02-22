export const logIn = (formData, setBtnLoading) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    // Object Destructuring
    const { emailAddress, password } = formData;

    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        dispatch({
          type: "SIGN_IN_SUCCESSFULLY",
          payload: "Sign in successfully",
        });
        setBtnLoading(false);
      })
      .catch((err) => {
        dispatch({
          type: "SIGN_IN_ERROR",
          payload: err.message,
        });
        setBtnLoading(false);
      });
  };
};

export const clearAll = () => {
  return {
    type: "CLEAR_ALL",
  };
};

export const signOut = (push) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        push && push("/");
      });
  };
};
