import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipeDetail, addToCart } from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import opensocket from "socket.io-client";


class Detail extends Component {
  componentDidMount() {
    console.log("componentDidMount of detail",this.props);
    // console.log({...this.props.detail,"_csrf" : this.props.csrf},"crs detail")
    this.props.fetchRecipeDetail(this.props.match.params._id);
    const socket = opensocket("http://localhost:3000");
    socket.on("recipes", (data) => {
      if (data.action === "edit") {
        this.props.fetchRecipeDetail(this.props.match.params._id);
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const socket = opensocket("http://localhost:3000");
    socket.on("recipes", (data) => {
      if (data.action === "edit") {
        this.props.fetchRecipeDetail(this.props.match.params._id);
      }
    });
  }

  fetchProp() {
    if (this.props.detail !== null) {
      console.log(this.props.detail._id, "finally");

  return (
    <div>
      <img  src={`/${this.props.detail['picUrl']}`}/>
      <div >{this.props.detail['name']}</div>
      <p >{this.props.detail['description']}</p>
      <div >{this.props.detail['price']}</div>
    </div>
  );

    }
  }
  addToCart(e) {
    
    this.props.addToCart(this.props.detail);
    this.props.history.push(`/cart`);
  }
  deleteRecipe(e) {
    e.preventDefault();
    this.props.deleteRecipe(this.props.detail);
    this.props.history.push(`/recipes`);
  }
  addButtons() {
    if (this.props.detail !== null && this.props.auth) {
      return (
        <div>
          <button onClick={(e) => this.addToCart(e)}>ADD</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        this is one of the recipe
        {this.fetchProp()}
        {this.addButtons()}
          <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("mapStateToProps---->state.detail", state);
  return {
    detail: state.detail,
    auth: state.auth,
    owner:state.owner
  };
};

const loadedData = (store, id) => {
  console.log(store, id, "loadingggggggg loadedData Detail");

  return store.dispatch(fetchRecipeDetail(id));
};
export default withRouter({
  loadedData,
  component: connect(mapStateToProps, {
    fetchRecipeDetail,
    addToCart,
  })(Detail),
});
