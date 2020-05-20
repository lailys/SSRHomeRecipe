import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { authenticateAccount } from "../actions";
import opensocket from 'socket.io-client'

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
      <div>
        <form onSubmit={this.login}>
          <input
            onChange={(e) => this.createRecipe(e)}
            id="email"
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="password"
            type="text"
            placeholder="Password"
          />
          <br />
          <br />
          <button type="submit">LOGIN</button>
          <button type="submit">
            <Link to="/signup" className="header-link">
              SIGNUP
            </Link>
          </button>
          <button>
            <Link to="/reset-password-request" className="header-link">
              RESET PASSWORD
            </Link>
          </button>
        </form>
        <div id="message">message: {this.state.message}</div>
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
