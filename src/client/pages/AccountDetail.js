import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipeDetail, deleteRecipe, addToCart } from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class AccountDetail extends Component {
  state={
    Date:'',
    user:'',
    message:""
  }

  componentDidMount() {
    console.log("componentDidMount of detail", this.props);
    // console.log({...this.props.detail,"_csrf" : this.props.csrf},"crs detail")
    this.props.fetchRecipeDetail(this.props.match.params._id);
    if(this.props.detail){

      this.setState({date:new Date(this.props.detail.createdAt).toLocaleDateString('en-US',options),
                     user:localStorage.getItem("user")})
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("detail update", prevProps, this.props);

    if (this.props.detail !== null) {
      if (prevProps.detail === null) {
        this.props.fetchRecipeDetail(this.props.detail._id);
      } else {
        Object.keys(this.props.detail).map((dets) => {
          if (prevProps.detail[dets] !== this.props.detail[dets]) {
            this.props.fetchRecipeDetail(this.props.detail._id);
          }
        });
      }
    }
  }
  fetchProp() {
    if (this.props.detail !== null) {
      console.log(this.props.detail._id, "finally");

  return (
    <div>
      <img  src={`/${this.props.detail['picUrl']}`} className="detail-img"/>
      <div>{this.state.date}</div>
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
    this.props.history.push(`/my-account/${this.state.user}-1`);
  }
  addButtons() {
    if (this.props.detail !== null && this.props.auth) {
      return (
        <div>
          <button>
            <Link to={`/edit-recipe/${this.props.detail._id}`}>EDIT</Link>
          </button>
          <br />
          <button onClick={(e) => this.deleteRecipe(e)}>DELETE</button>
          <br />
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.fetchProp()}
        {this.addButtons()}
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps---->state.mdetail", state);
  return {
    detail: state.detail,
    auth: state.auth,
    // csrf:state.csrf
  };
};

const loadedData = (store, id,logged,user) => {
  console.log(store, user, "loadingggggggg loadedData fetchOwnerRecipeDetail");

  return store.dispatch(fetchRecipeDetail(id));
};
export default withRouter({
  loadedData,
  component: connect(mapStateToProps, {
    fetchRecipeDetail,
    deleteRecipe,
    addToCart,
  })(AccountDetail),
});
