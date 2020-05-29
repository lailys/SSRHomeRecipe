import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipeDetail, deleteRecipe, addToCart } from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

class AccountDetail extends Component {
  state = {
    Date: "",
    user: "",
    message: "",
  };

  componentDidMount() {
    console.log("componentDidMount of detail", this.props);
    // console.log({...this.props.detail,"_csrf" : this.props.csrf},"crs detail")
    if(Object.keys(this.props.auth)<1){
      this.props.history.push('/login')
    }
    this.props.fetchRecipeDetail(this.props.match.params._id);
    if (this.props.detail) {
      this.setState({
        date: new Date(this.props.detail.createdAt).toLocaleDateString(
          "en-US",
          options
        ),
        user: localStorage.getItem("user"),
      });
    }
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
  renderStars() {
    let stars = [];
    if (this.props.detail !== null) {
      let extra = this.props.detail["stars"] % 1;
      let full = this.props.detail["stars"] / 1;
      let empty;
      let half;

      extra > 0 ? (half = 1) : (half = 0);
      empty = 5 - half + full;
      for (let i = 0; i < 5; i++) {
        if (i < full) {
          stars.push(<i className="fas fa-star"></i>);
        } else if (half) {
          stars.push(<i className="fas fa-star-half-alt"></i>);
        } else {
          stars.push(<i className="far fa-star"></i>);
        }
      }
    }
    return <section className="staring">{stars}</section>;
  }
  fetchProp() {
    if (this.props.detail !== null) {
      console.log(this.props.detail._id, "finally");

      return (
        <div className="detail-container">
          <img
            src={`/${this.props.detail["picUrl"]}`}
            className="account-detail-img"
          />
          <div className="account-detail-slice">
            <div className="detail-stars">{this.renderStars()}</div>
            <div className="detail-name">{this.props.detail["name"]}</div>
            <div className="detail-author">author:{this.props.detail["author"]}</div>
            <div className="detail-category">Category:{this.props.detail["category"]}</div>
            <div className="detail-date">
              {new Date(this.props.detail.createdAt).toLocaleDateString(
                "en-US",
                options
              )}
            </div>
            <p className="detail-description">{this.props.detail["description"]}</p>
            <div className="detail-price">${this.props.detail["price"]}</div>
            {this.addButtons()}
            {this.fetchComments()}
          </div>
        </div>
      );
    }
  }
  fetchComments = () => {
    return (
      <div className="comment-slice">

      </div>
    );
  };
  addToCart(e) {
    this.props.addToCart(this.props.detail);
    this.props.history.push(`/cart`);
  }
  deleteRecipe(e) {
    console.log(this.state.user, "this.state.user");
    e.preventDefault();
    this.props.deleteRecipe(this.props.detail);
    this.props.history.push(`/my-account/${this.state.user}-1`);
  }
  addButtons() {
    if (this.props.detail !== null && Object.keys(this.props.auth)>0) {
      return (
        <div className="account-buttons">
          <button>
            <Link to={`/edit-recipe/${this.props.detail._id}`} className="account-link">EDIT</Link>
          </button>
      
          <button onClick={(e) => this.deleteRecipe(e)}>DELETE</button>
         
        </div>
      );
    }
  }
  render() {
    return (
      <div className="account-detail">
        {this.fetchProp()}
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

const loadedData = (store, id, logged, user) => {
  console.log(store, user, "loadingggggggg loadedData fetchOwnerRecipeDetail");

  return store.dispatch(fetchRecipeDetail(id));
};
export default withRouter({
  // loadedData,
  component: connect(mapStateToProps, {
    fetchRecipeDetail,
    deleteRecipe,
    addToCart,
  })(AccountDetail),
});
