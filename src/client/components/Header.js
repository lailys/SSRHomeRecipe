import React, { Component } from "react";
import { Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginToAccount} from "../actions";

class Header extends Component {
  componentDidMount() {
    this.props.loginToAccount()
    console.log("componentDidMount of headerrrr",this.props,"login");
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("update header",prevProps.auth!==this.props.auth)

  //     if(prevProps.auth!==this.props.auth){
  //       this.props.loginToAccount();
  //     }

  // }
  // logout=(e)=>{
  //   this.props.loginOutAccount()
  // this.props.history.push('/login')
  //   console.log("logout")
  // }
  // adjustButtons() {
  //   console.log(this.props, "headerpropsssssssssssssss",this.props.auth,">>>");
  //   if (this.props.auth===true) {
  //     return (
  //       <div>
  //         <Link to="/add-newrecipe" className="header-link">
  //           ADD RECIPE
  //         </Link>
  //         <Link to="/cart" className="header-link">
  //           CART
  //         </Link>
  //         <Link to="/orders" className="header-link">
  //           ORDERS
  //         </Link>
  //         <Link to="/login" className="header-link">
  //           LOGIN
  //         </Link>
  //         <button onClick={(e) => this.logout(e)} className="header-link">
  //           LOGOUT
  //         </button>
  //       </div>
  //     );
  //   }else{
  //     return (
  //       <Link to="/login" className="header-link">
  //         LOGIN
  //       </Link>
  //     );
  //   }
  // }
  render() {
    return (
      <div className="header">
        <Link to="/" className="header-link">
          HOME
        </Link>
        <Link to="/recipes" className="header-link">
          RECIPES
        </Link>
        <Link to="/cart" className="header-link">
          CART
        </Link>
        <Link to="/orders" className="header-link">
          ORDERS
        </Link>
        <Link to="/add-newrecipe" className="header-link">
          ADD RECIPE
        </Link>
        <Link to="/login" className="header-link">
          LOGIN
        </Link>
        {/* {this.adjustButtons()} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps---->state.auth", state);
  return {
    detail: true,
    auth: state.auth,
  };
}

const loadedData = (store) => {
  console.log("loadingggggggg loadedData header");
  return store.dispatch(loginToAccount());

};
export default withRouter(connect(mapStateToProps, { loginToAccount})(Header));

// export default withRouter(connect(mapStateToProps,{loginToAccount})(Header));

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// const Header = () => {

//   return (
//     <div className="header">
//       <Link to="/">HOME</Link>
//       <Link to="/recipes" className="header-link">RECIPES</Link>
//     </div>
//   );
// };

// function mapStateToProps(state) {
//   console.log(
//     "mapStateToProps---->state.auth",
//     state
//   );
// }

// export default connect(mapStateToProps)(Header);
