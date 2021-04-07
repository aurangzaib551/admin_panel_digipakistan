import React, { Component } from "react";
import { marketing } from "../config/fbConfigMarketing";
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

class MarketingWithDrawalRequests extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    const that = this;
    this.setState({ loading: true });

    marketing
      .database()
      .ref()
      .on("value", (snapshot) => {
        if (snapshot.exists) {
          const data = [];
          snapshot.forEach((doc) => {
            data.push({
              id: doc.key,
              data: doc.val(),
            });
            that.setState({ loading: false, data });
          });
        } else {
          that.setState({ loading: false });
        }
      });
  }

  render() {
    // Object Destructuring
    const { uid, history } = this.props;

    if (!uid) return <Redirect to="/" />;

    return (
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
            {this.state.data.length > 0 && (
              <TableHead>
                <TableRow>
                  <TableCell className="fw-bold text-nowrap">
                    Full Name
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">Email</TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Mobile #
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Category of Account
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Account TItle
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Account Number
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Bank Name
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Branch Address
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Branch Code
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">
                    Total Amount
                  </TableCell>
                  <TableCell className="fw-bold text-nowrap">Message</TableCell>
                  <TableCell className="fw-bold text-nowrap">Action</TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {this.state.data &&
                this.state.data.map((val, ind) => {
                  return (
                    <TableRow key={ind}>
                      <TableCell className="text-nowrap">
                        {val.data.Name}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data.Email}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Mobile Number"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Category of Account"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Account TItle"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Account Number"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Bank Name"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Branch Address"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Branch Code"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Total Amount"]}
                      </TableCell>
                      <TableCell className="text-nowrap">
                        {val.data["Message"]}
                      </TableCell>

                      <TableCell className="text-nowrap">
                        <Button
                          onClick={() =>
                            history.push(
                              `/marketingEdit/${val.id}/${val.data.Name}/${val.data["Total Amount"]}`
                            )
                          }
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
          </Table>
        </TableContainer>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketingWithDrawalRequests);
