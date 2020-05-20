import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOwnerRecipes, ownerRecipes } from "../actions";
import { Link, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import opensocket from 'socket.io-client'

class MyAccount extends Component {
  state = {
    page: 1,
    user:'',
    message:""
  };
  componentDidMount() {
    console.log(this.props.auth,"componentDidMount of myaccount",this.props.auth.msg);
    if(this.props.auth.msg){
      this.setState({ message: "session has been expired, please login again"})
     
    }
    this.setState({user:localStorage.getItem("user")})
    this.props.fetchOwnerRecipes(localStorage.getItem("user"));
    if(!{user:localStorage.getItem("user")}){
      this.props.history.push('/login')
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("detail update", prevProps, this.props);
    // if (prevProps.recipes.length !== this.props.recipes.length) {
    //   this.props.fetchOwnerRecipes(this.state.user);
    // }
  }
  renderRecipes() {
  
    if (this.props.pageRecipes) {
      return this.props.pageRecipes.map((recipes, i) => {
      if (this.props.auth) {
        return (
          <li key={i} className="recipepage-recipe">
            <img src={`/${recipes.picUrl}`} className="recipepage-img" />
            <Link to={`/myrecipes/${recipes._id}`}>
              <b>{recipes.name}</b>
            </Link>
          </li>
        );
      }
    });
  }
  }
  paging() {
    let rows = [];
    if (this.props.recipes) {
      for (let i = 1; i < this.props.recipes.length / 9 + 1; i++) {
        console.log(
          `/my-account/${this.state.user}-${i}`,
          "`/my-account/${this.state.user}-${i}`"
        );
        rows.push(
          <Link to={`/my-account/${this.state.user}-${i}`}>{i}</Link>
        );
      }
      return <section className="pagination">{rows}</section>;
    }
  }

  render() {
    return (
      <div>
        <h1>MY ACCOUNT</h1>
        <div className="recipepage">{this.renderRecipes()}</div>
        <section>{this.paging()}</section>
        <div id="message">message: {this.state.message}</div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps---->state.detail", state);
  return {
    auth: state.auth,
    recipes: state.ownerRecipes.ownerRecipes,
    pageRecipes: state.ownerRecipes.ownerRecipespage
  };
};

const loadedData = (store, id, logged, user, url) => {
  console.log(store, id, url, "loadingggggggg loadedData MyAccount",store.getState());

  return store.dispatch(ownerRecipes(id));
};

export default withRouter({
  loadedData, 
  component: connect(mapStateToProps, { fetchOwnerRecipes,ownerRecipes  })(
    MyAccount
  ),
});


