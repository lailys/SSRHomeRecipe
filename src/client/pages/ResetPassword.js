import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { postNewPassword } from "../actions";

class ResetPassword extends Component {
  state = {
    updatedPassword: {},
    message: "",
  };
  componentDidMount() {
    console.log("componentDidMount of ResetPassword", this.props);
    console.log(
      "componentDidMount of ResetPassword",
      this.props.match.params.token
    );
  }
  createRecipe = (e) => {
    console.log(e.target.value, "e.target.value");
    let updatedPassword = Object.assign({}, this.state.updatedPassword);
    updatedPassword[e.target.id] = e.target.value;
    this.setState({ updatedPassword });
  };
  updatePassword = (e) => {
    e.preventDefault();
    console.log(this.state.updatedPassword, "this.state.updatedPassword");
    this.props
      .postNewPassword({
        ...this.state.updatedPassword,
        ...this.props.match.params,
      })
      .then((res) => {
        this.props.history.push("/login");
      });
  };
  render() {
    return (
      <div className="login-page">
        <form onSubmit={this.updatePassword} className="login-form">
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="password"
            type="text"
            placeholder="Password"
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="passwordConfirmation"
            type="text"
            placeholder="Password Confirmation"
          />
          <br />
          <button type="submit" className="main-button">RESET PASSWORD</button>
        </form>
        <div id="message">message: {this.state.message}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("mapStateToProps---->state. ResetPassword", state);
  // return {
  //   passwordOwner:state.passwordOwner
  // };
}

export default withRouter({
  component: connect(mapStateToProps, { postNewPassword })(ResetPassword),
});
