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
import { password } from "../config/fbConfigPassword";
import { Alert } from "@material-ui/lab";

class RegisteredUsers extends Component {
  state = {
    students: [],
    lastVisible: "",
    limit: 50,
    search: "",
    allow: true,
    searchData: [],
    searchResult: [],
    searchResult2: [],
    number: [],
    totalStudents: [],
    loading: false,
    option: "",
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
      .orderBy("rollNumber", "asc")
      .limit(this.state.limit)
      .get()
      .then(function (data) {
        let lastVisible = data.docs[data.docs.length - 1];
        that.setState({ lastVisible });
        const students = data.docs.map((doc) => {
          return {
            data: doc.data(),
            id: doc.id,
          };
        });

        that.setState({ students, loading: false });
      });

    lms
      .firestore()
      .collection("users")
      .onSnapshot((data) => {
        const searchData = [];

        data.docs.forEach((doc) => {
          searchData.push({ data: doc.data(), id: doc.id });
        });

        this.setState({ searchData });
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

  handlePageNext = () => {
    const that = this;

    lms
      .firestore()
      .collection("users")
      .orderBy("rollNumber", "asc")
      .startAt(that.state.lastVisible)
      .limit(that.state.limit)
      .get()
      .then((querySnapshot) => {
        let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        const students = querySnapshot.docs.map((doc) => {
          return {
            data: doc.data(),
            id: doc.id,
          };
        });

        that.setState({ students, lastVisible });
      });
  };

  handlePagePrev = () => {
    lms
      .firestore()
      .collection("users")
      .orderBy("rollNumber", "asc")
      .endAt(this.state.lastVisible)
      .limit(this.state.limit)
      .get()
      .then((querySnapshot) => {
        let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        const students = querySnapshot.docs.map((doc) => {
          return {
            data: doc.data(),
            id: doc.id,
          };
        });

        students && this.setState({ students: students, lastVisible });
      });
  };

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    // Object Destructuring
    const { uid, history } = this.props;

    if (!uid) return <Redirect to="/" />;

    const handleApplicationSubmitted = () => {
      const students = this.state.searchData.filter(
        (doc) => doc.data.applicationSubmitted === true
      );

      this.setState({ searchResult: students, allow: false });
    };

    const handleEnroll = () => {
      const students = this.state.searchData.filter(
        (doc) => doc.data.lms === true
      );

      this.setState({ searchResult: students, allow: false });
    };

    const handleSearch = () => {
      const that = this;
      const students = this.state.searchData.filter(
        (doc) => doc.data[this.state.option] === that.state.search
      );

      this.setState({ searchResult2: students, allow: false, students: [] });
    };

    const handleOption = ({ target }) => {
      this.setState({ option: target.value });
    };

    const handleBack = () => {
      this.setState({ allow: true, searchResult: [] });
    };
    return this.state.correct ? (
      <React.Fragment>
        <Nav />
        <div className="m-3 d-flex flex-column align-items-center">
          <Input
            id="search"
            variant="filled"
            label="Search"
            className="me-3"
            fullWidth
            onChange={this.handleChange}
          />
          <div className="d-flex flex-column align-items-center flex-sm-row mt-3">
            <Button
              className="outline me-sm-2 text-nowrap"
              variant="outlined"
              onClick={handleSearch}
            >
              Search
            </Button>

            <Input
              id="option"
              variant="filled"
              className="option mt-3 mt-sm-0"
              label="Type of Search"
              onChange={handleOption}
              value={this.state.option}
              fullWidth
              select
            >
              <MenuItem value="rollNumber">Roll #</MenuItem>
              <MenuItem value="fullName">Full Name</MenuItem>
            </Input>
          </div>
        </div>
        <div className="m-3 d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-center flex-sm-row mt-3">
            <Button
              className="outline me-sm-2 text-nowrap"
              variant="outlined"
              onClick={handleApplicationSubmitted}
            >
              Application Submitted Data
            </Button>
            <Button
              className="outline me-sm-2 text-nowrap"
              variant="outlined"
              onClick={handleEnroll}
            >
              Enrolled Students In LMS
            </Button>
            <Button
              className="outline me-sm-2 text-nowrap"
              variant="outlined"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </div>
        <p className="m-3">
          <span className="fw-bold">Total Registerations:</span>{" "}
          {this.state.searchData.length}
        </p>
        <p className="m-3">
          <span className="fw-bold">Search Result:</span>{" "}
          {this.state.searchResult.length}
        </p>
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
            {this.state.allow && (
              <>
                {this.state.students.length > 0 && (
                  <TableHead>
                    <TableRow>
                      <TableCell className="fw-bold text-nowrap">
                        Roll #
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Full Name
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Father Name
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Application Submitted
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {this.state.students &&
                    this.state.students.map((val, ind) => {
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
                              className="outline"
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </>
            )}

            {this.state.allow === false && (
              <>
                {this.state.searchResult2.length > 0 && (
                  <TableHead>
                    <TableRow>
                      <TableCell className="fw-bold text-nowrap">
                        Roll #
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Full Name
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Father Name
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Application Submitted
                      </TableCell>
                      <TableCell className="fw-bold text-nowrap">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {this.state.searchResult2 &&
                    this.state.searchResult2.map((val, ind) => {
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
                              className="outline"
                              variant="contained"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>

        {!this.state.loading && (
          <div className="d-flex justify-content-center mt-3 mb-2">
            <Button
              onClick={this.handlePagePrev}
              className="outline me-2"
              variant="outlined"
            >
              Go Back
            </Button>
            <Button
              onClick={this.handlePageNext}
              className="outline"
              variant="outlined"
            >
              Next
            </Button>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredUsers);
