import React, { Component } from "react";
import { connect } from "react-redux";
import { editRecipe, fetchRecipeDetail } from "../actions";
import { withRouter } from "react-router-dom";

class updateRecipe extends Component {

  state = {
    updatedRecipe: {},
    message: "",
  };
  componentDidMount() {
    console.log("componentDidMount of editting", this.props);

    this.props.fetchRecipeDetail(this.props.match.params._id);
    let updatedRecipe = Object.assign({}, this.state.updatedRecipe);
    if (this.props.detail) {
      updatedRecipe.name = this.props.detail.name;
      updatedRecipe.price = this.props.detail.price;
      updatedRecipe.picUrl = this.props.detail.picUrl;
      updatedRecipe.description = this.props.detail.description;
      updatedRecipe._id = this.props.detail._id;
      this.setState({ updatedRecipe });
    }
  }

  createRecipe = (e) => {
    // console.log(e.target.value, "e.target.value");
    let updatedRecipe = Object.assign({}, this.state.updatedRecipe);
    !e.target.files?updatedRecipe[e.target.id] = e.target.value:updatedRecipe[e.target.id]=event.target.files[0]
    this.setState({ updatedRecipe });
  };
  submitUpdatedRecipe = (e) => {
    e.preventDefault();
    if(Object.keys(this.props.auth).length<1){
      this.setState({ message: "session has been expired, please login again"})
     
    }
console.log("updating starts")
    var formData = new FormData()
    Object.keys(this.state.updatedRecipe).map(key=>{
      console.log(key,this.state.updatedRecipe[key],"this.state.updatedRecipe[key]")
      formData.append(key, this.state.updatedRecipe[key]);
    })
console.log(formData,"updatedata")
    this.props
      .editRecipe(formData, this.props.detail._id)
      .then((res) => {
        if (res.data.msg) {
          this.setState({ message: res.data.msg });
        } else {

          this.props.history.push(`/myrecipes/${this.props.detail._id}`);
        }
        console.log(res,"resolved");
      });
  };
  render() {
    return (
      <div>
        <h1>EDIT</h1>
        <form onSubmit={this.submitUpdatedRecipe} encType="multipart/form-data">
          <input
            onChange={(e) => this.createRecipe(e)}
            id="name"
            type="text"
            defaultValue={this.props.detail.name || ""}
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="picUrl"
            name="picUrl"
            type="file"
            // defaultValue={this.props.detail.picUrl}

          />
          <br />
          <textarea
            onChange={(e) => this.createRecipe(e)}
            id="description"
            name="description"
            type="text"
            rows="10"
            defaultValue={this.props.detail.description }
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="price"
            name="price"
            type="text"
            defaultValue={this.props.detail.price || 0}
          />
          <br />
          <button type="submit">Submit recipe</button>
        </form>
        <div id="message">message: {this.state.message}</div>

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(
    "mapStateToProps---->updatestate.detail",
    state
  );
  return {
    detail: state.detail,
    auth: state.auth,
    // csrf:state.csrf
  };
};

const loadedData = (store, id) => {
  console.log(store,id, "loadingggggggg loadedData Detail");

  return store.dispatch(fetchRecipeDetail(id));
};


export default withRouter({
  loadedData,
  component: connect(mapStateToProps, { editRecipe, fetchRecipeDetail })(
    updateRecipe
  ),
});
