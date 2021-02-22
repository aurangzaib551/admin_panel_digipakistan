import React, { useLayoutEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { logIn, clearAll } from "../store/actions/authActions";
import ToastServive from "react-material-toast";
import { Redirect, useHistory } from "react-router-dom";

const toast = ToastServive.new({
  place: "topRight",
  duration: 2,
  maxCount: 1,
});

const LogIn = (props) => {
  // State
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Object Destructuring
  const { logIn, clearAll, msg, isLoggedIn } = props;
  const { replace } = useHistory();

  useLayoutEffect(() => {
    if (msg === "Sign in successfully") {
      toast.success(msg, () => {
        setFormData({
          emailAddress: "",
          password: "",
        });
        clearAll();
        replace("/dashboard");
      });
    } else if (msg) {
      toast.error(msg, () => {
        clearAll();
      });
    }
    return () => {};
  }, [msg, clearAll, replace]);

  // getting value from inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // validating input fields
  const validate = () => {
    const errors = {};

    // Regular Expression
    const emailRegEx = /^[\w_.-]+@([\w-]+\.)+\w{2,4}$/;

    if (formData.emailAddress.trim() === "") {
      errors.emailAddress = "Email address mustn't be empty";
    } else if (!emailRegEx.test(formData.emailAddress)) {
      errors.emailAddress = "Invalid Email Address";
    }

    if (formData.password.trim() === "") {
      errors.password = "Password mustn't be empty";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // sending data for logging in
  const handleSubmit = (e) => {
    e.preventDefault();

    setBtnLoading(true);

    // Checking Errors in inputs
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    // Logging in user
    logIn(formData, setBtnLoading);
  };

  if (!isLoggedIn) return <Redirect to="/dashboard" />;

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <Paper elevation={5} className="p-3">
          <div className="d-flex justify-content-center">
            <img
              src="https://i.ibb.co/LYC7rpt/logoPNG.png"
              alt="DigiPAKISTAN"
              width="200"
            />
          </div>
          <h3 className="text-center fw-bold">Log In</h3>
          <form onSubmit={handleSubmit} className="mt-3 form">
            <Input
              variant="filled"
              id="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              label="Email Address"
              fullWidth
            />

            {errors.emailAddress && (
              <Alert severity="error" variant="filled">
                {errors.emailAddress}
              </Alert>
            )}

            <Input
              className="mt-3"
              variant="filled"
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              label="Password"
              fullWidth
            />

            {errors.password && (
              <Alert severity="error" variant="filled">
                {errors.password}
              </Alert>
            )}

            <Button
              disabled={btnLoading}
              type="submit"
              variant="contained"
              className="mui-btn-contained mt-3"
              fullWidth
            >
              {btnLoading && <CircularProgress className="loader me-3" />}{" "}
              {btnLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    msg: state.auth.msg,
    isLoggedIn: state.firebase.auth.isEmpty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (formData, setBtnLoading) =>
      dispatch(logIn(formData, setBtnLoading)),
    clearAll: () => dispatch(clearAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
