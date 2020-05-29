import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewRecipe, loginOutAccount } from "../actions";
import { withRouter } from "react-router-dom";

class AddRecipe extends Component {
  state = {
    newRecipe: {category:"cooking"},
    message: "",
    file: {},
    category: "COOKING",
  };
  componentDidMount() {
    console.log("componentDidMount of addrecipe", this.props);
    if (Object.keys(this.props.auth).length < 1) {
      this.setState({
        message: "please login again to be able to post your recipe",
      });
    }
  }

  createRecipe = (e) => {
    console.log(
      event.target.value,
      "createRecipe piccccccc",
      this.state.newRecipe
    );
    let newRecipe = Object.assign({}, this.state.newRecipe);
    let pic = Object.assign({}, this.state.file);

    if (!e.target.files) {
      newRecipe[e.target.id] = e.target.value;
      this.setState({ category: event.target.value });
    } else {
      console.log(event.target.files, "event.target.files[0]");
      //  this.setState({file:URL.createObjectURL(event.target.files[0])})

      // pic[e.target.id] = URL.createObjectURL(event.target.files[0]);
      pic[e.target.id] = event.target.files[0].name;
      newRecipe[e.target.id] = event.target.files[0];
    }
    this.setState({
      newRecipe,
      file: pic,
    });
  };
  checkCategory(){
    if(!this.state.newRecipe.category){
      let newRecipe = Object.assign({}, this.state.newRecipe);
      newRecipe.category = 'cooking';
      this.setState({newRecipe})
    }
  }
  submitNewRecipe = (e) => {
    e.preventDefault();

    if (Object.keys(this.props.auth).length < 1) {
      this.setState({
        message: "session has been expired, please login again",
      });
    }
    // this.checkCategory()
    // console.log(this.state.newRecipe.category,"::::")

    var formData = new FormData();
    Object.keys(this.state.newRecipe).map((key) => {
      console.log(key, this.state.newRecipe[key], "this.state.newRecipe[key]");
      formData.append(key, this.state.newRecipe[key]);
    });

    this.props
      .postNewRecipe(formData)
      .then((res) => {
        console.log(res.data, "res.data");
        if (res.data.msg) {
          res.data.msg === "jwt expired"
            ? this.setState({
                message: "session has been expired, please login again",
              })
            : this.setState({ message: res.data.msg });
        } else {
          this.props.history.push(`/myrecipes/${res.data}`);
        }
      })
      .catch((err) => this.setState({ message: res.data }));
  };
  render() {
    return (
      <div className="add-recipe-page">
        <form
          onSubmit={this.submitNewRecipe}
          encType="multipart/form-data"
          className="add-form"
        >
          {/* < div className="pic-container"> */}
          <div className="add-title">ADD RECIPE</div>
          <div class="file-upload">
            {/* <img className="upload-imag" src={this.state.file.picUrl} /> */}
            <div className="upload-imag">
              <div className="upload-button fa fa-chevron-up"></div>
              <div className="upload-name ">{this.state.file.picUrl}</div>
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

          {/* </div> */}

          <input
            onChange={(e) => this.createRecipe(e)}
            className="add-input"
            id="name"
            type="text"
            placeholder="name"
          />
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
          <input
            onChange={(e) => this.createRecipe(e)}
            id="price"
            type="text"
            placeholder="price"
          />
          <textarea
            onChange={(e) => this.createRecipe(e)}
            id="description"
            type="text"
            placeholder="description"
            rows="10"
          />

     

          <button type="submit" className="edit-button">
            ADD RECIPE
          </button>
        </form>
        <div id="message"> {this.state.message}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps---->state.detail", state);

  return {
    auth: state.auth,
    // csrf:state.csrf
  };
}

export default withRouter({
  component: connect(mapStateToProps, { postNewRecipe, loginOutAccount })(
    AddRecipe
  ),
});
