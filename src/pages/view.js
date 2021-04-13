import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Loader from "../loader/loader";
import firebase from "../config/fbConfig";
import Nav from "../components/dashboard/nav";

class Edit extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id)
      .get()
      .then((data) => {
        if (data.exists) {
          this.setState({ loading: true, data: data.data().ratings });
        } else {
          this.setState({ loading: true });
        }
      });
  }

  render() {
    return this.state.loading ? (
      <>
        <Nav />
        <div className="container">
          <h1 className="display-4 text-center m-3 fw-bold">View User</h1>
          {this.state.data ? (
            this.state.data.map((val, ind) => {
              return (
                <React.Fragment key={ind}>
                  <h6 className="fw-bold">
                    Video Name:{" "}
                    <span className="fw-normal">{val.courseName}</span>
                  </h6>
                  <h6 className="fw-bold">
                    Comment: <span className="fw-normal">{val.comment}</span>
                  </h6>
                  <h6 className="fw-bold">
                    Happy: <span className="fw-normal">{val.stars} / 5</span>
                  </h6>
                </React.Fragment>
              );
            })
          ) : (
            <h1>There is no rating yet</h1>
          )}
        </div>
      </>
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
