import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchRecipeDetail,
  addToCart,
  openCart,
  closeCart,
  addComment,
} from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import opensocket from "socket.io-client";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  newComment: "",
};
class Detail extends Component {
  state = {
    user: "",
  };
  componentDidMount() {
    console.log(
      localStorage.getItem("cart"),
      "componentDidMount of detail",
      this.props
    );
    // console.log({...this.props.detail,"_csrf" : this.props.csrf},"crs detail")
    this.setState({ user: localStorage.getItem("user") });
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
  renderStars() {
    let stars = [];
    if (this.props.detail !== null) {
      let extra = this.props.detail["stars"] % 1;
      let full = this.props.detail["stars"] / 1;
      let empty;
      let half;

      extra > 0 ? (half = 1) : (half = 0);
      empty = 5 - half + full;
      console.log(empty, "emptyyyyyyyyyyyyy");
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
    return <section className="page-staring">{stars}</section>;
  }
  fetchProp() {
    if (this.props.detail !== null) {
      console.log(this.props.detail._id, "finally");

      return (
        <div className="detail-page-container">
          <img
            src={`/${this.props.detail["picUrl"]}`}
            className="detail-page-pic"
          />
          <div className="detail-page-slice">
            <div className="page-stars">{this.renderStars()}</div>
            <div className="page-name">{this.props.detail["name"]}</div>
            <div className="page-author">
              author:{this.props.detail["author"]}
            </div>
            <div className="page-category">
              Category:{this.props.detail["category"]}
            </div>
            <div className="page-date">
              {new Date(this.props.detail.createdAt).toLocaleDateString(
                "en-US",
                options
              )}
            </div>

            <p className="page-detail">{this.props.detail["description"]}</p>
            <div className="detail-page-price">
              $ {this.props.detail["price"]}
            </div>
            <br />
            {this.addButtons()}
            <br />
            {this.renderCommentArea()}
          </div>
        </div>
      );
    }
  }

  createRecipe = (e) => {
    console.log(event.target.value, "???");
    this.setState({ newComment: event.target.value });
  };
  submitComment = (e) => {
    e.preventDefault();
    console.log(this.state.newComment, "e.target.value");
    this.props.addComment(
      this.state.newComment,
      this.props.detail._id,
      this.state.user
    );
    this.setState({ newComment: "" });
  };
  review = () => {
    if (this.state.user) {
      return (
        <form onSubmit={this.submitComment}>
          <textarea
            className="text-area"
            value={this.state.newComment}
            onChange={(e) => this.createRecipe(e)}
          ></textarea>
          <br />
          {/* <select
              onChange={(e) => this.createRecipe(e)}
              id="stars"
            >
              <option className="far fa-star" value="1" onClick={e=>this.giveStar(e)}></option>
              <i class="far fa-star full-1" ></i>
              <option className="far fa-star" value="2" onClick={e=>this.giveStar(e)}></option>
              <i class="far fa-star full-2"></i>
              <option className="far fa-star" value="3" onClick={e=>this.giveStar(e)}></option>
              <i class="far fa-star full-3"></i>
              <option className="far fa-star" value="4" onClick={e=>this.giveStar(e)}></option>
              <i class="far fa-star full-4"></i>
              <option className="far fa-star" value="5" onClick={e=>this.giveStar(e)}></option>
              <i class="far fa-star full-5"></i>
            </select> */}

          <br />
          <button type="submit">COMMENT</button>
        </form>
      );
    }
  };
  giveStar(e) {
    console.log(e.target.className);
  }
  renderCommentArea() {
    return (
      <div className="comment-area">
        {this.review()}

        <br />
        <div className="comments">{this.fetchComments()}</div>
      </div>
    );
  }
  fetchComments = () => {
    if (this.props.detail) {
      return this.props.detail.comments.map((comment, i) => {
      return(  <div className="each-comment">
          <div className="comment">
          <span className="commenter">*{comment.commenter}-></span> 
         <span className="note">{comment.comment}</span> 
            </div>
          <br/>
          <br/>
        </div>)
      });
    }
  };
  addToCart(e) {
    this.props.addToCart(this.props.detail);
    this.props.openCart();
    setTimeout(() => {
      this.props.closeCart();
    }, 4000);

    // this.props.history.push(`/cart`);
  }
  deleteRecipe(e) {
    e.preventDefault();
    this.props.deleteRecipe(this.props.detail);
    this.props.history.push(`/recipes`);
  }
  addButtons() {
    console.log(
      this.props.auth,
      "this.props.detail !== null && this.props.auth"
    );
    if (this.state.user) {
      return (
        <button onClick={(e) => this.addToCart(e)} className="detail-button">
          ADD
        </button>
      );
    }
  }

  render() {
    return (
      <div className="detail-page">
        {this.fetchProp()}
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
    owner: state.owner,
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
    openCart,
    closeCart,
    addComment,
  })(Detail),
});
