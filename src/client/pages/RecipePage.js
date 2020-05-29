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
    pageActive: "1",
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
      this.props.match.params._id.split("-")[1]
    );
    this.setState({ pageActive: this.props.match.params._id.split("-")[1] });
    this.props.fetchRecipes(this.props.match.params._id);
    const socket = opensocket("http://localhost:3000");
    socket.on("recipes", (data) => {
      if (data.action === "create") {
        this.props.fetchRecipes(this.props.match.params._id);
      } else if (data.action === "edit") {
        console.log("aaaaaaaaaaaa");
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
      this.setState({ pageActive: this.props.match.params._id.split("-")[1] });
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
        console.log(recipes, "recipe page recipe");
        // if (this.state.token) {
        //   return (
        //     <div key={i} className="recipe-page-recipe">
        //       <img src={`/${recipes.picUrl}`} className="recipe-page-img" />
        //       <div className="recipe-page-shade"></div>
        //       {/* <div className="creator">{recipes.userId}?{recipes.userId.name}:{}</div> */}
        //       <Link to={`/recipes/${recipes._id}`}>
        //         <b>{recipes.name}</b>
        //       </Link>
        //       {/* <button onClick={(e) => this.addToCart(e, recipes)}>ADD</button> */}
        //     </div>
        //   );
        // } else {
        return (
          // <div key={i} className="account-recipe-page">
          //   <Link
          //     to={`/recipes/${recipes._id}`}
          //     className="account-recipe-link"
          //   >
          //     <img src={`/${recipes.picUrl}`} className="image" />
          //     <div className="image-name">{recipes.name}</div>
          //   </Link>
          // </div>
          <div key={i} className="account-recipe-page">
          <Link
            to={`/recipes/${recipes._id}`}
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
      for (let i = 1; i < this.props.recipes.length / 10 + 1; i++) {
        console.log(
          this.state.pageActive,
          "`/home-recipes/${this.state.user}-${i}`"
        );
        if (`${i}` === this.state.pageActive) {
          rows.push(
            <Link
              to={`/home-recipes/${this.state.user}-${i}`}
              className="pagination-link"
              style={{
                fontWeight: "500",
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
              to={`/home-recipes/${this.state.user}-${i}`}
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
    return (
      <div className="account-explenation">
        <p className="account-description">explor all the recipes has been posted</p>
        <div className="account-connection"></div>
      </div>
    );
  }
  render() {
    return (
      // <div className="recipe-page">
      //   {/* {this.head()} */}
      //   {this.renderMain()}
      //   <div className="account-first">
      //     <div className="recipe-title">RECIPES</div>
      //   </div>
      //   <div className="recipepage-second">
      //     <div className="account-items">{this.renderRecipes()}</div>
      //     {this.paging()}
      //   </div>
      //   {/* <div className="recipe-page-scroll">
      //     <div className="recipe-page-top"></div>
      //     <div className="recipe-page-slice">{this.renderRecipes()}</div>
      //     {this.paging()}
      //   </div> */}
      // </div>
      <div className="my-account">
      {this.renderMain()}
      <div className="account-first">
        <div className="account-title">RECIPES</div>
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
