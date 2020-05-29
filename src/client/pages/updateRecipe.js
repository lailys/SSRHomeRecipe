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
    if(Object.keys(this.props.auth)<1){
      this.props.history.push('/login')
    }
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
      <div className="edit-page"> 
    
        <form onSubmit={this.submitUpdatedRecipe} encType="multipart/form-data" className="update-form">
        <div className="edit-title">EDIT</div>
          <input
            onChange={(e) => this.createRecipe(e)}
            className="add-input"
            id="name"
            type="text"
            defaultValue={this.props.detail.name || ""}
          />
          <br />
          <div class="file-upload">
            {/* <img className="upload-imag" src={this.state.file.picUrl} /> */}
            <div className="upload-imag">
              <div className="upload-button fa fa-chevron-up"></div>
              <div className="upload-name ">
                <div className="scroll-name">
                  {this.props.detail.picUrl}
                  </div>
                </div>
            </div>
            <input
              onChange={(e) => this.createRecipe(e)}
              // accept="image/*"
              id="picUrl"
              name="picUrl"
              type="file"
              placeholder="image URL"
            />
          </div>
          {/* <input
            onChange={(e) => this.createRecipe(e)}
            id="picUrl"
            name="picUrl"
            type="file"
            defaultValue={this.props.detail.picUrl}

          /> */}
          <br />
          <textarea
            onChange={(e) => this.createRecipe(e)}
            id="description"
            className="edit-description"
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
          <select
            value={this.state.category}
            onChange={(e) => this.createRecipe(e)}
            id="category"
          >
            <option value="cooking">COOKING</option>
            <option value="baking">BAKING</option>
            <option value="deinking">DRINKING</option>
            <option value="icecreaming">ICE CREAMING</option>
          </select>
          <button type="submit" className="edit-button">SUBMIT CHANGES</button>
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
