import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { signupNewUser } from "../actions";

class Signup extends Component {
  state = {
    newUser: {},
    message: "",
  };
  componentDidMount() {
    console.log("componentDidMount of login", this.props);
  }
  createRecipe = (e) => {
    console.log(e.target.value, "e.target.value");
    let newUser = Object.assign({}, this.state.newUser);
    newUser[e.target.id] = e.target.value;
    this.setState({ newUser });
  };

  signup = (e) => {
    e.preventDefault();
    console.log(
      this.state.newUser,
      "this.state.newUser.password===this.state.newUser.confirmPassword"
    );
    this.props.signupNewUser(this.state.newUser).then((res) => {
      if (this.props.newUser === "1") {
        this.props.history.push("/login");
      } else{
        this.setState({ message:this.props.msg });

      }
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.signup} noValidate>
          <input
            onChange={(e) => this.createRecipe(e)}
            id="name"
            type="text"
            placeholder="name"
            required
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="email"
            type="email"
            placeholder="Email"
            required
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="password"
            type="text"
            placeholder="Password"
            required
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="confirmPassword"
            type="text"
            placeholder="Confirm Password"
            required
          />
          <br />
          <br />
          <button type="submit">SIGNUP</button>
        </form>
        <div id="message">message: {this.state.message}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("mapStateToProps---->state. Signup", state);
  return {
    newUser: state.newUser,
  };
}

// const loadedData = (store) => {
//   console.log(store, "loadingggggggg loadedData login");
//   return store.dispatch(loginToAccount());
// }

export default withRouter({
  // loadedData,
  component: connect(mapStateToProps, { signupNewUser })(Signup),
});
