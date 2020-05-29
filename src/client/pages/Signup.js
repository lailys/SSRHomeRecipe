import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { signupNewUser } from "../actions";

class Signup extends Component {
  state = {
    newUser: {},
    message: [],
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
      console.log(res, "signup------->");
      if (res.payload.newUser === "1") {
        this.props.history.push("/login");
      } else {
        this.setState({ message: res.payload.msg });
      }
    });
  };
  renderMessage() {
    let allmsg =[];
    if (this.state.message.length > 0) {
      
      this.state.message.map((msg) => {
      allmsg.push(<div className="each-message">{msg.msg}</div>)
      });
    }
    return(<p>{allmsg}</p>)
  }
  render() {
    return (
      <div className="login-page">
        <form onSubmit={this.signup} noValidate className="login-form">
          <div className="login-title">SIGNUP</div>
          {/* <br />
          <br /> */}
          <input
            onChange={(e) => this.createRecipe(e)}
            id="name"
            type="text"
            placeholder="Name"
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
          <Link to="/login" className="change-password">
            Already have an account?
          </Link>
          <button type="submit" className="main-button">
            SIGNUP
          </button>
        </form>
        <div id="message">{this.renderMessage()}</div>
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
