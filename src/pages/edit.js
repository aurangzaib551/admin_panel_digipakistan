import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Loader from "../loader/loader";
import Button from "@material-ui/core/Button";
import firebase from "../config/fbConfig";
import CircularProgress from "@material-ui/core/CircularProgress";

class Edit extends Component {
  state = {
    editData: "",
    firstCourseTitle: "",
    firstCourseName: "",
    firstCourseLink: "",
    firstCourseStatus: false,
    secondCourseTitle: "",
    secondCourseName: "",
    secondCourseLink: "",
    secondCourseStatus: false,
    thirdCourseTitle: "",
    thirdCourseName: "",
    thirdCourseLink: "",
    thirdCourseStatus: false,
    loading: false,
    update: false,
  };

  handleChange = (e) => {
    this.setState({
      editData: {
        ...this.state.editData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleAnotherChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLMS = (e) => {
    if (e.target.value === "true") {
      this.setState({
        editData: {
          ...this.state.editData,
          lms: true,
        },
      });
    } else if (e.target.value === "false") {
      this.setState({
        editData: {
          ...this.state.editData,
          lms: false,
        },
      });
    }
  };

  handleAnotherLMS = (e) => {
    if (e.target.name === "firstCourseStatus") {
      if (e.target.value === "true") {
        this.setState({
          firstCourseStatus: true,
        });
      } else if (e.target.value === "false") {
        this.setState({
          firstCourseStatus: false,
        });
      }
    } else if (e.target.name === "secondCourseStatus") {
      if (e.target.value === "true") {
        this.setState({
          secondCourseStatus: true,
        });
      } else if (e.target.value === "false") {
        this.setState({
          secondCourseStatus: false,
        });
      }
    } else if (e.target.name === "thirdCourseStatus") {
      if (e.target.value === "true") {
        this.setState({
          thirdCourseStatus: true,
        });
      } else if (e.target.value === "false") {
        this.setState({
          thirdCourseStatus: false,
        });
      }
    }
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id)
      .get()
      .then((data) => {
        if (data.exists) {
          this.setState({
            loading: true,
            editData: data.data(),
            firstCourseTitle: data.data().course[0]
              ? data.data().course[0]["First Course Title"]
              : "",
            firstCourseName: data.data().course[0]
              ? data.data().course[0]["First Course Name"].name
              : "",
            firstCourseStatus: data.data().course[0]
              ? data.data().course[0]["First Course Name"].status
              : false,
            firstCourseLink: data.data().course[0]
              ? data.data().course[0]["First Course Name"].link
              : "",
            secondCourseTitle: data.data().course[1]
              ? data.data().course[1]["Second Course Title"]
              : "",
            secondCourseName: data.data().course[1]
              ? data.data().course[1]["Second Course Name"].name
              : "",
            secondCourseStatus: data.data().course[1]
              ? data.data().course[1]["Second Course Name"].status
              : false,
            secondCourseLink: data.data().course[1]
              ? data.data().course[1]["Second Course Name"].link
              : "",
            thirdCourseTitle: data.data().course[2]
              ? data.data().course[2]["Third Course Title"]
              : "",
            thirdCourseName: data.data().course[2]
              ? data.data().course[2]["Third Course Name"].name
              : "",
            thirdCourseStatus: data.data().course[2]
              ? data.data().course[2]["Third Course Name"].status
              : false,
            thirdCourseLink: data.data().course[2]
              ? data.data().course[2]["Third Course Name"].link
              : "",
          });
        }
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let course = [];

    const first = {
      "First Course Title": this.state.firstCourseTitle,
      "First Course Name": {
        link: this.state.firstCourseLink,
        name: this.state.firstCourseName,
        status: this.state.firstCourseStatus,
      },
    };

    const second = {
      "Second Course Title": this.state.secondCourseTitle,
      "Second Course Name": {
        link: this.state.secondCourseLink,
        name: this.state.secondCourseName,
        status: this.state.secondCourseStatus,
      },
    };

    const third = {
      "Third Course Title": this.state.thirdCourseTitle,
      "Third Course Name": {
        link: this.state.thirdCourseLink,
        name: this.state.thirdCourseName,
        status: this.state.thirdCourseStatus,
      },
    };

    if (this.state.firstCourseTitle) {
      course.push(first);
    }

    if (this.state.secondCourseTitle) {
      course.push(second);
    }

    if (this.state.thirdCourseTitle) {
      course.push(third);
    }

    this.setState({
      editData: {
        ...this.state.editData,
        course,
      },
    });

    this.setState({ update: true });
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id)
      .update({
        fullName: this.state.editData.fullName,
        rollNumber: this.state.editData.rollNumber,
        course: course ? course : [],
        fatherName: this.state.editData.fatherName
          ? this.state.editData.fatherName
          : "",
        lms: this.state.editData.lms ? this.state.editData.lms : false,
      })
      .then(() => {
        this.setState({ update: false });
      });
  };

  render() {
    return this.state.loading ? (
      <div className="container">
        <h1 className="display-4 text-center m-3 fw-bold">Edit User</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="batch" className="form-label fw-bold">
              Batch
            </label>
            <input
              type="text"
              value={this.state.editData.batch}
              onChange={this.handleChange}
              name="batch"
              className="form-control"
              id="batch"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="roll#" className="form-label fw-bold">
              Roll #
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              name="rollNumber"
              value={this.state.editData.rollNumber}
              className="form-control"
              id="roll#"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label fw-bold">
              Full Name
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              name="fullName"
              value={this.state.editData.fullName}
              className="form-control"
              id="fullName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fatherName" className="form-label fw-bold">
              Father Name
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              name="fatherName"
              value={this.state.editData.fatherName}
              className="form-control"
              id="fatherName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="LMS Status" className="form-label fw-bold">
              LMS Status
            </label>
            <select
              value={this.state.editData.lms}
              onChange={this.handleLMS}
              name="lms"
              className="form-select"
              id="LMS Status"
            >
              <option value="">Choose</option>
              <option value={true}>Open</option>
              <option value={false}>Close</option>
            </select>
          </div>

          {this.state.firstCourseTitle && (
            <>
              <div className="mb-3">
                <label htmlFor="First Course" className="form-label fw-bold">
                  First Course
                </label>
                <input
                  type="text"
                  disabled
                  name="firstCourseTitle"
                  onChange={this.handleAnotherChange}
                  value={this.state.firstCourseTitle}
                  className="form-control"
                  id="First Course"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="First Course Category"
                  className="form-label fw-bold"
                >
                  First Course Category
                </label>
                <input
                  type="text"
                  value={this.state.firstCourseName}
                  onChange={this.handleAnotherChange}
                  name="firstCourseName"
                  className="form-control"
                  id="First Course Category"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="First Course Status"
                  className="form-label fw-bold"
                >
                  First Course Status
                </label>
                <select
                  value={this.state.firstCourseStatus}
                  className="form-select"
                  onChange={this.handleAnotherLMS}
                  name="firstCourseStatus"
                  id="First Course Status"
                >
                  <option value="">Choose</option>
                  <option value={true}>Open</option>
                  <option value={false}>Close</option>
                </select>
              </div>
            </>
          )}

          {this.state.secondCourseTitle && (
            <>
              <div className="mb-3">
                <label htmlFor="Second Course" className="form-label fw-bold">
                  Second Course
                </label>
                <input
                  type="text"
                  disabled
                  onChange={this.handleAnotherChange}
                  name="secondCourseTitle"
                  value={this.state.secondCourseTitle}
                  className="form-control"
                  id="Second Course"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Second Course Category"
                  className="form-label fw-bold"
                >
                  Second Course Category
                </label>
                <input
                  type="text"
                  onChange={this.handleAnotherChange}
                  name="secondCourseName"
                  value={this.state.secondCourseName}
                  className="form-control"
                  id="Second Course Category"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Second Course Status"
                  className="form-label fw-bold"
                >
                  Second Course Status
                </label>
                <select
                  onChange={this.handleAnotherLMS}
                  name="secondCourseStatus"
                  value={this.state.secondCourseStatus}
                  className="form-select"
                  id="Second Course Status"
                >
                  <option value="">Choose</option>
                  <option value={true}>Open</option>
                  <option value={false}>Close</option>
                </select>
              </div>
            </>
          )}
          {this.state.thirdCourseTitle && (
            <>
              <div className="mb-3">
                <label htmlFor="Third Course" className="form-label fw-bold">
                  Third Course
                </label>
                <input
                  type="text"
                  disabled
                  name="thirdCourseTitle"
                  onChange={this.handleAnotherChange}
                  value={this.state.thirdCourseTitle}
                  className="form-control"
                  id="Third Course"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Third Course Category"
                  className="form-label fw-bold"
                >
                  Third Course Category
                </label>
                <input
                  type="text"
                  name="thirdCourseName"
                  onChange={this.handleAnotherChange}
                  value={this.state.thirdCourseName}
                  className="form-control"
                  id="Third Course Category"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Third Course Status"
                  className="form-label fw-bold"
                >
                  Third Course Status
                </label>
                <select
                  value={this.state.thirdCourseStatus}
                  className="form-select"
                  name="thirdCourseStatus"
                  onChange={this.handleAnotherLMS}
                  id="Third Course Status"
                >
                  <option value="">Choose</option>
                  <option value={true}>Open</option>
                  <option value={false}>Close</option>
                </select>
              </div>
            </>
          )}
          <div className="my-3 d-flex justify-content-center">
            <Button
              type="submit"
              variant="contained"
              className="outline"
              color="primary"
            >
              {this.state.update && (
                <CircularProgress className="loader me-2" />
              )}
              {this.state.update ? "Updating" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.firestore.data.users
      ? state.firestore.data.users[ownProps.match.params.id]
      : "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  //   firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Edit);
