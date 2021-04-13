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
import { password } from "../config/fbConfigPassword";
import { Alert } from "@material-ui/lab";

class Ratings extends Component {
  state = {
    students: [],
    allow: true,
    loading: false,
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
      .collection("users")
      .get()
      .then(function (data) {
        let students = [];
        data.forEach((doc) => {
          students.push({ data: doc.data(), id: doc.id });
        });

        that.setState({ students, loading: false });
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
      .child("/Registered Users")
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

    const lmsStudents = this.state.students.filter(
      (stu) => stu.data.lms === true
    );

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
            {lmsStudents.length > 0 && (
              <TableHead>
                <TableRow>
                  <TableCell className="fw-bold text-nowrap">Roll #</TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Full Name
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Father Name
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Application Submitted
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">Actions</TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {lmsStudents.length > 0 &&
                lmsStudents.map((val, ind) => {
                  return (
                    <TableRow key={ind}>
                      <TableCell className="text-nowrap">
                        {val.data.rollNumber}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data.fullName}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data.fatherName}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data.applicationSubmitted ? "Submitted" : "No"}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        <Button
                          onClick={() => history.push(`/edit/${val.id}`)}
                          className="outline me-2"
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => history.push(`/view/${val.id}`)}
                          className="outline"
                          variant="contained"
                          color="primary"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);
