import React, { Component } from "react";
import lms from "./../config/fbConfig";
import Nav from "../components/dashboard/nav";
import { signOut } from "../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

class SMS extends Component {
  state = {
    students: [],
    lastVisible: "",
    limit: 50,
    search: "",
    allow: true,
    searchData: [],
    searchResult: [],
    number: [],
  };

  componentDidMount() {
    const that = this;
    lms
      .firestore()
      .collection("Applications")
      .orderBy("Roll Number", "asc")
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

        that.setState({ students });
      });

    lms
      .firestore()
      .collection("Applications")
      .onSnapshot((data) => {
        const searchData = [];
        data.docs.forEach((doc) => {
          searchData.push(doc.data());
        });

        this.setState({ searchData });
      });

    if (this.props.admin) {
      setTimeout(() => {
        signOut(this.props.history.replace);
      }, 400);
    }
  }

  handlePageNext = () => {
    const that = this;

    lms
      .firestore()
      .collection("Applications")
      .orderBy("Roll Number", "asc")
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
      .collection("Applications")
      .orderBy("Roll Number", "asc")
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
    const { uid } = this.props;

    if (!uid) return <Redirect to="/" />;

    const handleSearch = () => {
      const that = this;
      const students = this.state.searchData.filter(
        (doc) => doc["Form Submit Date"] === that.state.search
      );

      this.setState({ searchResult: students, allow: false, students: [] });
    };

    const handleSms = () => {
      const arr = [];

      this.state.searchResult.map((val) => {
        arr.push(val["Mobile Number"].slice(1));
        return;
      });

      const message =
        "Your application has been submitted successfully. Our admission department is currently evaluating your application and we will inform you as your application is approved. In case you didn't receive notification by DigiPAKISTAN within next 24hrs, you can check your application status by logging to this link: digipakistan.org/apply-now/login ";

      axios.post(
        `https://secure.h3techs.com/sms/api/send?email=digipakistan.org@gmail.com&key=02813f09b8ea5a5be950bb7ec26e9ae986&mask=Digi Alert&multiple=1&to=${arr.join(
          ","
        )}&message=${message}`
      );
    };

    return (
      <React.Fragment>
        <Nav />
        <input type="text" placeholder="Search" onChange={this.handleChange} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleSms}>Send SMS</button>
        <div className="registered-students overflow-hidden">
          {/* headings */}

          <div className="row">
            <div className="col-3">
              <div className="border py-2 fw-bold text-center">Roll #</div>
            </div>
            <div className="col-3">
              <div className="border py-2 fw-bold text-center">
                Student Name
              </div>
            </div>
            <div className="col-3">
              <div className="border py-2 fw-bold text-center">Mobile #</div>
            </div>
            <div className="col-3">
              <div className="border py-2 fw-bold text-center">Date</div>
            </div>
          </div>

          {/* descriptions */}
          {this.state.allow && (
            <div className="row">
              {this.state.students &&
                this.state.students.map((val, ind) => {
                  return (
                    <React.Fragment key={ind}>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val.data["Roll Number"] && val.data["Roll Number"]}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val.data["Full Name"] && val.data["Full Name"]}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val.data["Mobile Number"].slice(1) &&
                            val.data["Mobile Number"].slice(1)}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val.data["Form Submit Date"] &&
                            val.data["Form Submit Date"]}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          )}

          {this.state.allow === false && (
            <div className="row">
              {this.state.searchResult &&
                this.state.searchResult.map((val, ind) => {
                  return (
                    <React.Fragment key={ind}>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val["Roll Number"]}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val["Full Name"]}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val["Mobile Number"].slice(1)}
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border p-2 text-center">
                          {val["Form Submit Date"]}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          )}
          <div className="d-flex justify-content-center">
            <button className="me-3" onClick={this.handlePagePrev}>
              Go Back
            </button>
            <button onClick={this.handlePageNext}>Next</button>
          </div>
        </div>
      </React.Fragment>
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
