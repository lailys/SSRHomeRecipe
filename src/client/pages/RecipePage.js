import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchRecipes, addToCart } from "../actions";
import { Link, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import opensocket from "socket.io-client";

class RecipePage extends Component {
  state = {
    page: 1,
  };
  componentDidMount() {
    this.setState({
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token"),
    });
    console.log("componentDidMount of recipepage", this.props);
    console.log(
      "componentDidMount of recipepage,params",
      localStorage.getItem("user"),
      this.props.match.params
    );

    this.props.fetchRecipes(this.props.match.params._id);
    const socket = opensocket("http://localhost:3000");
    socket.on("recipes", (data) => {
      if (data.action === "create") {
        this.props.fetchRecipes(this.props.match.params._id);
      }
      else if (data.action === "edit") {
        console.log("aaaaaaaaaaaa")
        this.props.fetchRecipes(this.props.match.params._id);
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "detail update",
      prevProps.location.pathname,
      this.props.location.pathname
    );
    if (prevProps.match.params._id !== this.props.match.params._id) {
      this.props.fetchRecipes(this.props.match.params._id);
    }
    const socket = opensocket("http://localhost:3000");
    socket.on("recipes", (data) => {
      if (data.action === "create") {
        this.props.fetchRecipes(this.props.match.params._id);
      }
    });
  }

  addToCart(e, recipe) {
    this.props.addToCart(recipe);
    this.props.history.push(`/cart`);
  }

  renderRecipes() {
    console.log(this.props, "this.state.page");
    if (this.props.pageRecipes) {
      return this.props.pageRecipes.map((recipes, i) => {
        console.log(recipes,"recipe page recipe")
        if (this.state.token) {
          return (
            <li key={i} className="recipepage-recipe">
              <img src={`/${recipes.picUrl}`} className="recipepage-img" />
          {/* <div className="creator">{recipes.userId}?{recipes.userId.name}:{}</div> */}
              <Link to={`/recipes/${recipes._id}`}>
                <b>{recipes.name}</b>
              </Link>
              <button onClick={(e) => this.addToCart(e, recipes)}>ADD</button>
            </li>
          );
        } else {
          return (
            <li key={i} className="recipepage-recipe">
              <img src={`/${recipes.picUrl}`} className="recipepage-img" />
              <Link to={`/recipes/${recipes._id}`}>
                <b>{recipes.name}</b>
              </Link>
            </li>
          );
        }
      });
    }
  }

  head() {
    return (
      <Helmet>
        <title>recipes</title>
        <meta property="og:title" content="recipes" />
      </Helmet>
    );
  }

  paging() {
    let rows = [];
    if (this.props.recipes) {
      for (let i = 1; i < this.props.recipes.length / 9 + 1; i++) {
        console.log(
          `/home-recipes/${this.state.user}-${i}`,
          "`/home-recipes/${this.state.user}-${i}`"
        );
        rows.push(
          <Link to={`/home-recipes/${this.state.user}-${i}`}>{i}</Link>
        );
      }
      return <section className="pagination">{rows}</section>;
    }
  }
  render() {
    return (
      <div className="recipepage">
        {this.head()}
        <div className="recipepage">{this.renderRecipes()}</div>
        {this.paging()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps---->state.recipes", state.recipes);
  return {
    recipes: state.recipes.data,
    pageRecipes: state.recipes.pagedata,
    auth: state.auth,
  };
}
const loadedData = (store, id, logged, user, url) => {
  console.log(store, id, url, "loadingggggggg loadedData RecipePage");

  return store.dispatch(fetchRecipes(id));
};
export default withRouter({
  loadedData,
  component: connect(mapStateToProps, {
    fetchRecipes,
    addToCart,
  })(RecipePage),
});
