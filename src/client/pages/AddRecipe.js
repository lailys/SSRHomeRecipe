import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewRecipe,loginOutAccount } from "../actions";
import { withRouter } from "react-router-dom";

class AddRecipe extends Component {
  state = {
    newRecipe: {},
    message: "",
  };

  componentDidMount() {
    console.log("componentDidMount of addrecipe", this.props);
    if(Object.keys(this.props.auth).length<1){
      this.setState({ message: "session has been expired, please login again"})
     
    }
  }

  createRecipe = (e) => {
    console.log(this.state.newRecipe, "createRecipe recipe");
    let newRecipe = Object.assign({}, this.state.newRecipe);
    !e.target.files
      ? (newRecipe[e.target.id] = e.target.value)
      : (newRecipe[e.target.id] = event.target.files[0]);

    this.setState({
      newRecipe,
    });
  };
  submitNewRecipe = (e) => {
    e.preventDefault();

if(Object.keys(this.props.auth).length<1){
  this.setState({ message: "session has been expired, please login again"})
 
}

    var formData = new FormData();
    Object.keys(this.state.newRecipe).map((key) => {
      console.log(key, this.state.newRecipe[key], "this.state.newRecipe[key]");
      formData.append(key, this.state.newRecipe[key]);
    });

    this.props
      .postNewRecipe(formData)
      .then((res) => {
        console.log(res.data,"res.data")
        if (res.data.msg) {
          res.data.msg==="jwt expired"?
          this.setState({ message: "session has been expired, please login again"}):
          this.setState({ message: res.data.msg });
        } else {
          this.props.history.push(`/myrecipes/${res.data}`);
        }
      })
      .catch((err) => this.setState({ message: res.data }));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submitNewRecipe} encType="multipart/form-data">
          <input
            onChange={(e) => this.createRecipe(e)}
            id="name"
            type="text"
            placeholder="name"
          />
          <br />
          <br />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="picUrl"
            name="picUrl"
            type="file"
            placeholder="image URL"
          />
          <br />
          <br />
          <br />
          <textarea
            onChange={(e) => this.createRecipe(e)}
            id="description"
            type="text"
            placeholder="description"
            rows="10"
          />
          <br />
          <input
            onChange={(e) => this.createRecipe(e)}
            id="price"
            type="text"
            placeholder="price"
          />
          <br />
          <button type="submit">Submit recipe</button>
        </form>
        <div id="message">message: {this.state.message}</div>
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
  component: connect(mapStateToProps, { postNewRecipe,loginOutAccount })(AddRecipe),
});
