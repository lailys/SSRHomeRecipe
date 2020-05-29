import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchOwnerRecipes,
  ownerRecipes,
  authenticateAccount,
} from "../actions";
import { Link, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import opensocket from "socket.io-client";

class MyAccount extends Component {
  state = {
    page: 1,
    user: "",
    message: "",
    pageActive: "1",
    authentication: {},
    message: "",
  };
  componentDidMount() {
    console.log(
      this.props.auth,
      localStorage.getItem("user"),
      "componentDidMount of myaccount",
      this.props.location.pathname.split("t/")[1]
    );
    if (this.props.auth.msg) {
      this.setState({
        message: "session has been expired, please login again",
      });
    }
    if (!{ user: localStorage.getItem("user") }) {
      this.props.history.push("/login");
    }
    const socket = opensocket("http://localhost:3000");
    socket.on("recipes", (data) => {
      if (data.action === "edit") {
        console.log("aaaaaaaaaaaa");
        this.props.fetchOwnerRecipes(
          this.props.location.pathname.split("t/")[1]
        );
      }
    });
    this.setState({ user: localStorage.getItem("user") });
    this.setState({
      pageActive: this.props.location.pathname.split("t/")[1].split("-")[1],
    });

    this.props.fetchOwnerRecipes(this.props.location.pathname.split("t/")[1]);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "detail update-------------------------------",
      prevProps.location.pathname,
      "detail update-------------------------------",
      this.props.location.pathname
    );
    if (prevProps.auth.token !== this.props.auth.token) {
      this.props.fetchOwnerRecipes(this.props.location.pathname.split("t/")[1]);
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchOwnerRecipes(this.props.location.pathname.split("t/")[1]);
      this.setState({
        pageActive: this.props.location.pathname.split("t/")[1].split("-")[1],
      });
    }
    const socket = opensocket("http://localhost:3000");
    socket.on("recipes", (data) => {
      if (data.action === "edit") {
        console.log("aaaaaaaaaaaa");
        this.props.fetchOwnerRecipes(
          this.props.location.pathname.split("t/")[1]
        );
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("detail update", prevProps, this.props);
    if(Object.keys(this.props.auth)<1){
      this.props.history.push('/login')
    }
    // if (this.props.detail !== null) {
    //   if (prevProps.detail === null) {
    //     this.props.fetchRecipeDetail(this.props.detail._id);
    //   } else {
    //     Object.keys(this.props.detail).map((dets) => {
    //       if (prevProps.detail[dets] !== this.props.detail[dets]) {
    //         this.props.fetchRecipeDetail(this.props.detail._id);
    //       }
    //     });
    //   }
    // }
  }
  createRecipe = (e) => {
    let authentication = Object.assign({}, this.state.authentication);
    console.log(authentication, "authentication");
    authentication[e.target.id] = e.target.value;
    this.setState({ authentication });
  };
  login = (e) => {
    console.log("clickedddddd");
    e.preventDefault();
    console.log(this.state.authentication, "this.state.authentication");
    this.props.authenticateAccount(this.state.authentication).then((res) => {
      if (res.payload.msg) {
        this.setState({ message: res.payload.msg.msg });
      } else {
        this.props.history.push(`/my-account/${this.state.user}`);
      }
    });
  };
  renderRecipes() {
    console.log(this.state.user, "token");
    if (this.state.user) {
      if (this.props.pageRecipes) {
        return this.props.pageRecipes.map((recipes, i) => {
          // if (this.props.auth) {
          return (
            <div key={i} className="account-recipe-page">
              <Link
                to={`/myrecipes/${recipes._id}`}
                className="account-recipe-link"
              >
                <img src={`/${recipes.picUrl}`} className="image" />
                <div className="image-name">{recipes.name}</div>
              </Link>
            </div>
          );
          // }
        });
      }
    }
  }
  paging() {
    let rows = [];
    if (this.props.recipes) {
      for (let i = 1; i < this.props.recipes.length / 10 + 1; i++) {
        console.log(
          this.state.pageActive,
          "`/home-recipes/${this.state.user}-${i}`"
        );
        if (`${i}` === this.state.pageActive) {
          rows.push(
            <Link
              to={`/my-account/${this.state.user}-${i}`}
              className="pagination-link"
              style={{
                fontWeight: "700",
                color: "#26262E",
                background: "white",
              }}
            >
              {i}
            </Link>
          );
        } else {
          rows.push(
            <Link
              to={`/my-account/${this.state.user}-${i}`}
              className="pagination-link"
            >
              {i}
            </Link>
          );
        }
      }
      return <section className="pagination">{rows}</section>;
    }
  }
  renderMain() {
    if (!this.state.user) {
      return (
        <div className="account-explenation">
                <p className="account-description">
           Please login first to be able see your account
          </p>
          <Link
            to="/login"
            className="account-login-link"
            onClick={(e) => console.log(e.target)}
          >
            LOGIN
          </Link>
        </div>
      );
    } else {
      return (
        <div className="account-explenation">
          <p className="account-description">
            List of all products you have made
          </p>
          <div className="account-connection"></div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="my-account">
        {this.renderMain()}
        <div className="account-first">
          <div className="account-title">MY ACCOUNT</div>
        </div>
        <div className="account-second">
          <div className="account-items">{this.renderRecipes()}</div>
          {this.paging()}
        </div>

        {/* {this.renderRecipes()}
        <section>{this.paging()}</section> */}
        {/* <div id="message">message: {this.state.message}</div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps---->state.detail myaccount", state);
  return {
    auth: state.auth,
    recipes: state.ownerRecipes.ownerRecipes,
    pageRecipes: state.ownerRecipes.ownerRecipespage,
  };
};

const loadedData = (store, id, logged, user, url) => {
  console.log(id, url, "loadingggggggg loadedData MyAccount", store.getState());

  return store.dispatch(ownerRecipes(id));
};

export default withRouter({
  loadedData,
  component: connect(mapStateToProps, {
    fetchOwnerRecipes,
    ownerRecipes,
    authenticateAccount,
  })(MyAccount),
});
