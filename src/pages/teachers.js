import React, { Component } from "react";
import lms from "../config/fbConfig";
import Nav from "../components/dashboard/nav";
import { signOut } from "../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import { password } from "../config/fbConfigPassword";

class SMS extends Component {
  state = {
    loading: false,
    teachers: [],
    correct: false,
    password: "",
    passwordLoading: false,
    msg: "",
  };

  componentDidMount() {
    const that = this;
    this.setState({ loading: true });

    lms
      .firestore()
      .collection("Become an instructor")
      .where("visibility", "==", "public")
      .get()
      .then(function (data) {
        let teachers = [];
        data.forEach((doc) => {
          teachers.push(doc.data());
        });
        that.setState({ loading: false, teachers });
      });

    if (this.props.admin) {
      setTimeout(() => {
        signOut(this.props.history.replace);
      }, 400);
    }
  }

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handlePasswordSubmit = (e) => {
    e.preventDefault();

    this.setState({ passwordLoading: true, msg: "" });

    password
      .database()
      .ref()
      .child("/teachers")
      .on("value", (snap) => {
        if (snap.exists) {
          if (snap.val().password === this.state.password) {
            this.setState({ correct: true, passwordLoading: false });
          } else {
            this.setState({
              msg: "Something is not correct",
              passwordLoading: false,
            });
          }
        } else {
          this.setState({ passwordLoading: false });
        }
      });
  };

  render() {
    // Object Destructuring
    const { uid, history } = this.props;

    if (!uid) return <Redirect to="/" />;

    return this.state.correct ? (
      <React.Fragment>
        <Nav />

        <TableContainer
          component={Paper}
          className="border applicants container"
        >
          {this.state.loading && (
            <div className="d-flex justify-content-center my-4">
              <CircularProgress style={{ color: "#02a39b" }} />
            </div>
          )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" className="fw-bold">
                  Name
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Email
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Mobile #
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Type of Course
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Expertise
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Bio
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  City
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Country
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  LinkedIN
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  CV
                </TableCell>
              </TableRow>
            </TableHead>
            {this.state.teachers.length > 0 &&
              this.state.teachers.map((teacher, ind) => {
                return (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        {teacher.instructorName}
                      </TableCell>
                      <TableCell align="center">
                        {teacher.emailAddress}
                      </TableCell>
                      <TableCell align="center">
                        {teacher.phoneNumber}
                      </TableCell>
                      <TableCell align="center">
                        {teacher.typeOfCourse}
                      </TableCell>
                      <TableCell align="center">{teacher.expertise}</TableCell>
                      <TableCell align="center">{teacher.bio}</TableCell>
                      <TableCell align="center">{teacher.city}</TableCell>
                      <TableCell align="center">{teacher.country}</TableCell>
                      <TableCell align="center">
                        {teacher.linkedInURL}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          href={teacher.cv}
                          target="_blank"
                          variant="contained"
                          color="primary"
                          className="text-white"
                        >
                          CV
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
      </React.Fragment>
    ) : (
      <>
        <Nav />
        <form className="m-5" onSubmit={this.handlePasswordSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              onChange={this.handlePassword}
              value={this.state.password}
              name="password"
              placeholder="Enter the password"
              className="form-control"
              id="password"
            />
          </div>

          {this.state.msg && (
            <Alert severity="error" variant="outlined">
              {this.state.msg}
            </Alert>
          )}

          <div className="my-3 d-flex justify-content-center">
            <Button
              type="submit"
              variant="contained"
              className="outline"
              color="primary"
            >
              {this.state.passwordLoading && (
                <CircularProgress className="loader me-2" />
              )}
              {this.state.passwordLoading ? "Checking Password..." : "Check"}
            </Button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    admin: state.firebase.profile.rollNumber || false,
    getData: state.firebase.profile.name || false,
    data: state.firestore.ordered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (push) => dispatch(signOut(push)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SMS);
