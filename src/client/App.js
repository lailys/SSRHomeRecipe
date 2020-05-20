import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginOutAccount,  } from "./actions";

class App extends Component {
  state = {
    token: null,
    user: null,
  };

  componentDidMount() {
    this.setState({
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
    });
    console.log("componentDidMount of apppppp", this.props);
    console.log(!this.state.token, "this.props.app.token");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("app detail update", prevProps, this.props);
    if (prevProps.token !== this.props.token) {
        this.setState({
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
    });
    }
    console.log(this.state.token, "this.props.app.token");
  }
  logout = (e) => {
    this.props.loginOutAccount();
    this.props.history.push("/");
    console.log("logout");
  };
  header() {
    
    if (this.state.token) {
      return (
        <div className="header">
          <Link to="/" className="header-link">
            HOME
          </Link>
          <Link to={`/home-recipes/${this.state.user}-1`} className="header-link">
            RECIPES
          </Link>
          <Link to="/add-newrecipe" className="header-link">
            ADD RECIPE
          </Link>
          <Link to="/cart" className="header-link">
            CART
          </Link>
          <Link to="/orders" className="header-link">
            ORDERS
          </Link>
          <Link to={`/my-account/${this.state.user}-1 `}className="header-link">
            MY ACCOUNT
          </Link>
          <button onClick={(e) => this.logout(e)} className="header-link">
            LOGOUT
          </button>
        </div>
      );
    } else {
      return (
        <div className="header">
           <Link to="/" className="header-link">
            HOME
          </Link>
          <Link to={`/home-recipes/${this.state.user}-1`} className="header-link">
            RECIPES
          </Link>
          <Link to="/add-newrecipe" className="header-link">
            ADD RECIPE
          </Link>
          <Link to="/cart" className="header-link">
            CART
          </Link>
          <Link to="/orders" className="header-link">
            ORDERS
          </Link>
          <Link to="/my-account/0-1" className="header-link">
            MY ACCOUNT
          </Link>
          <Link to="/login" className="header-link">
            LOGIN
          </Link>
          <Link to="/signup" className="header-link">
            SIGNUP
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.header()}
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state,"mapStateToProps---->state.app");

  return {
    token: state.auth.token,
    userid: state.auth.user,
  };
}
const loadedData = (store, id, auth) => {
  console.log(store, id, auth, "loadingggggggg loadedData App");
  // return store.dispatch(checkAuth(auth));
};
export default withRouter({
  // loadedData,
  component: connect(mapStateToProps, { loginOutAccount,  })(App),
});
