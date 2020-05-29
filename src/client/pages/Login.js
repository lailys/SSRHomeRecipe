import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { authenticateAccount } from "../actions";
import opensocket from "socket.io-client";

class Login extends Component {
  state = {
    authentication: {},
    message: "",
  };
  componentDidMount() {
    console.log("componentDidMount of login", this.props);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("detail update", prevProps, this.props, this.props.auth.msg);
  }
  createRecipe = (e) => {
    let authentication = Object.assign({}, this.state.authentication);
    console.log(authentication, "authentication");
    authentication[e.target.id] = e.target.value;
    this.setState({ authentication });
  };
  login = (e) => {
    e.preventDefault();
    console.log(this.state.authentication, "this.state.authentication");
    this.props.authenticateAccount(this.state.authentication).then((res) => {
      if (res.payload.msg) {
        this.setState({ message: res.payload.msg.msg });
      } else {
        this.props.history.push("/");
      }
    });
  };
  render() {
    return (
      <div className="login-page">
        {/* <div className="login-slice"> */}
        {/* <div className="login-pic-2"></div> */}
        <form onSubmit={this.login} className="login-form">
          <div className="login-title">LOGIN</div>
          <input
            onChange={(e) => this.createRecipe(e)}
            id="email"
            type="email"
            placeholder="Email"          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="password"
            type="text"
            placeholder="Password"          />
          <Link to="/reset-password-request" className="change-password">
            Forgot your password?
          </Link>
          <button type="submit" className="main-button">
            LOGIN
          </button>
          <div className="line">
            <div className="line-l" />
            or
            <div className="line-r" />
          </div>
          <Link to="/signup" className="header-link button">
            SIGNUP
          </Link>
        </form>
        {/* </div> */}
        <div id="message"> {this.state.message}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("mapStateToProps---->state.login", state);
  return {
    auth: state.auth,
  };
}

// const loadedData = (store,id,log,csrf) => {
//   console.log(csrf, "loadingggggggg loadedData login");
//   return store.dispatch(Csrf(csrf));
// }

export default withRouter({
  // loadedData,
  component: connect(mapStateToProps, { authenticateAccount })(Login),
});
