import React, { Component } from "react";
import Loader from "../loader/loader";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { marketing } from "../config/fbConfigMarketing";

class MarketingEdit extends Component {
  state = {
    loading: false,
    name: this.props.match.params.name,
    amount: this.props.match.params.amount,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    marketing
      .database()
      .ref()
      .child(`/${this.props.match.params.id}`)
      .update({
        "Total Amount": this.state.amount,
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <h1 className="display-4 text-center m-3 fw-bold">Edit</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="batch" className="form-label fw-bold">
              Full Name
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              defaultValue={this.state.name}
              disabled={true}
              className="form-control"
              id="batch"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label fw-bold">
              Total Amount
            </label>
            <input
              type="text"
              onChange={this.handleChange}
              defaultValue={this.state.amount}
              name="amount"
              className="form-control"
              id="amount"
            />
          </div>

          <div className="my-3 d-flex justify-content-center">
            <Button
              type="submit"
              variant="contained"
              className="outline"
              color="primary"
            >
              {this.state.loading && (
                <CircularProgress className="loader me-2" />
              )}
              {this.state.loading ? "Updating" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default MarketingEdit;
