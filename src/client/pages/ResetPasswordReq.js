import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { resetPasswordRequest } from "../actions";

class ResetPasswordReq extends Component {
  state = {
    email: {},
    message:""
  };
  componentDidMount() {
    console.log("componentDidMount of resetPassword", this.props);
  }
  createRecipe = (e) => {
    console.log(e.target.value, "e.target.value");
    let email = Object.assign({}, this.state.email);
    email[e.target.id] = e.target.value;
    this.setState({ email });
  };

  request = (e) => {
    e.preventDefault();
    console.log(
      this.state.email,
      "this.state.newUser.password===this.state.newUser.confirmPassword"
    );
  this.props.resetPasswordRequest(this.state.email)
  .then(res=>{
    if(this.props.exist===1){

      this.setState({ message:"submitted!" });
    }else{
      this.setState({ message:"email dosnt exist" });
    }
  })
  };
  render() {
    return (
      <div>
             <form onSubmit={this.request}>
          <input
            onChange={(e) => this.createRecipe(e)}
            id="email"
            type="email"
            placeholder='email'
            required
          />
          <br />
          <br />
          <br />
          <button type="submit">RESET PASSWORD</button>
          <br />
          <br />
          <br />
          <div id="message">message: {this.state.message}</div>
        </form>

      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("mapStateToProps---->state. ResetPasswordReq", state);
  return {
    exist:state.exist,
   //  csrf:state.csrf
};
}


export default withRouter({

  component: connect(mapStateToProps, { resetPasswordRequest })(ResetPasswordReq),
});
