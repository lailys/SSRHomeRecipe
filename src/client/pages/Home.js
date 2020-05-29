import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchRecipes } from "../actions";
import { Link, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import opensocket from "socket.io-client";

class Home extends Component {
  componentDidMount() {
    //   // this.setState({
    //   //   user: localStorage.getItem("user"),
    //   //   token: localStorage.getItem("token"),
    //   // });
    //   console.log("componentDidMount of recent", this.props);

    this.props.fetchRecipes("null");
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
  topten() {
    console.log(this.props.recipes, "this.props.recipes.slice(0, 11)");
    if (this.props.recipes) {
      return this.props.recipes.slice(0, 10).map((recipe, i) => {
        return (
          <div key={i} className="topten-recipe">
            <Link to={`/recipes/${recipe._id}`} className="topten-recipe-link">
              <img src={`/${recipe.picUrl}`} className="recipepage-img" />
              <div className="topten-recipe-name">{recipe.name}</div>
            </Link>
          </div>
        );
      });
    }
  }
  // recentten() {
  //   if (this.props.recipes) {
  //     return this.props.recipes.slice(0, 10).map((recipe, i) => {
  //       return (
  //         // <div key={i} className="recipepage-recipe">
  //           <Link to={`/recipes/${recipe._id}`} key={i} className="recentten-recipe">
  //             <img src={`/${recipe.picUrl}`} className="recentten-img" />
  //             <div className="recentten-recipe-name">{recipe.name}</div>
  //           </Link>
  //         // </div>
  //       );
  //     });
  //   }
  // }
  render() {
    return (
      <div className="home">
        <div id="image"></div>
        <div id="recent">
          <div className="top-ten">
            <div className="top-ten-title"> TOP TEN</div>
            <div className="topten-scroll">
              {/* mhsgjhfshjgsfhgsfhgsdshgdsgfsdgfsdsgfdsgfdsgf------------------->>>>>>>>>>>---------------------------->>>>>>-----------------------------------------------------------------> */}
              <div className="topten-container">{this.topten()}</div>
            </div>
          </div>
          <div className="categories-title"> CATEGORIES</div>
          <div className="category-type">
            <div className="type-meal">MEAL</div>
            <div className="type-pastry">PASTRY</div>
            <div className="type-drink">DRINKS</div>
            <div className="type-ice">ICE CREAM</div>
          </div>
          {/* <div className="recent-ten">
            <div className="recent-ten-title"> MOST RECENT</div>
            <div className="recentten-scroll">{this.recentten()}</div>
          </div> */}
        </div>
        {/* <div id="footer"></div>  */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("mapStateToProps---->state.recipes home", state.recipes);
  return {
    recipes: state.recipes.data,
    auth: state.auth,
  };
}
const loadedData = (store, id, logged, user, url) => {
  console.log(store, id, url, "loadingggggggg loadedData home");

  return store.dispatch(fetchRecipes("null"));
};
export default withRouter({
  // loadedData,
  component: connect(mapStateToProps, {
    fetchRecipes,
  })(Home),
});
// export default {
//   component: Home,
// };
