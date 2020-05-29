import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  loginOutAccount,
  fetchCartItems,
  deletFromCart,
  ownerCartItems,
  submitOrder ,
  closeCart
} from "./actions";
import Cart from "./pages/Cart";

const isBrowser = typeof window !== `undefined`;

class App extends Component {
  state = {
    token: null,
    user: null,
    menuId: "",
    timesId: "",
    button: 0,
    menulistId: "",
    barPosition: "left -50vh",
    message: "",
    cart: "",
    cartButton: 0,
    // cartOpen:""
  };

  componentDidMount() {
    this.setState({
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
      total: this.props.cart.total,
      // cartOpen:localStorage.getItem("cart"),
    });
    window.addEventListener("scroll", this.getScrollPosition);
    this.props.fetchCartItems();
    console.log(this.props.openCart,"carttttttttttttttt didmount");
  
    // if(localStorage.getItem("cart")){
    //   this.setState({
    //     cart: "cart-clicked",
    //     cartButton: 1,
    //   });

    // }else{
    //   this.setState({
    //     cart: "",
    //     cartButton: 0,
    //   });
    // }
    // if(!localStorage.getItem("cart")){
    //   this.setState({
    //     cart: "",
    //     cartButton: 0,
    //   });
    // }else{
    //   this.setState({
    //     cart: "cart-clicked",
    //     cartButton: 1,
    //   });
    // }
    // console.log("carttttttttttttttt", localStorage.getItem("cart"));
    // console.log("componentDidMount of apppppp", this.props);
    // console.log(!this.state.token, "this.props.app.token");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.cartOpen,"carttttttttttttttt updateeeeeeeeeeeeeeeeeeee");
    if (prevProps.token !== this.props.token) {
      this.setState({
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
      });
    }
    if (prevProps.cart.total !== this.props.cart.total) {
      this.props.fetchCartItems();
      // this.setState({cartOpen:localStorage.getItem("cart")})
    }
    if (prevProps.openCart !== this.props.openCart) {
    if(!this.props.openCart){
      this.setState({
        cart: "",
        cartButton: 0,
      });
    }else{
      this.setState({
        cart: "cart-clicked",
        cartButton: 1,
      });
    }
    }

    // console.log(this.state.token, "this.props.app.token");
  }

  openCart = (e) => {
    if (this.state.cart === '' ) {
      // localStorage.setItem(cart,1);
      this.setState({
        cart: "cart-clicked",
        cartButton: 1,
      });
    } else if (this.state.cart === 'cart-clicked')  {
this.props.closeCart()
      this.setState({
        cart: "",
        cartButton: 0,
      });
    }
  };
  openMenu = () => {
    if (this.state.button === 0) {
      this.setState({
        menuId: "menu-clicked",
        timesId: "times-clicked",
        menulistId: "menu-list-clicked",
        cart: "",
        cartButton: 0,
      });
    }
    console.log(document.body);
    this.props.closeCart()
    this.setState({
      cart: "",
      cartButton: 0,
    });
    this.setState({ button: 1 });

  };

  closeMenu = () => {
    console.log("yes");
    if (this.state.button === 1) {
      this.setState({ menuId: "", timesId: "", menulistId: "" });
    }
    this.props.closeCart()
    this.setState({
      cart: "",
      cartButton: 0,
    });
    this.setState({ button: 0 });
  };
  closeByMenuClick = (e) => {
    console.log(
      "yes",
      this.state.menuId,
      "",
      this.state.timesId,
      "",
      this.state.menulistId,
      "",
      this.state.button
    );
    e.preventDefault();
    this.setState({ menuId: "", timesId: "", menulistId: "", button: 0 });
  };
  logout = (e) => {
    this.props.loginOutAccount();
    this.props.history.push("/");
    console.log("logout");
  };

  side() {

    if (!this.state.user) {
      return (
        <div className="side-menu">
          <div
            className="menu-circle"
            id={this.state.menuId}
            onClick={this.openMenu}
          ></div>
          <i
            className="fas fa-times"
            id={this.state.timesId}
            onClick={this.closeMenu}
            aria-hidden="true"
          ></i>
          <Link to="/my-account/0-1" className="fas fa-user link higher" onClick={e=>this.closeMenu(e)}/>
          <i to="/my-account/0-1" className="fas fa-search link higher" />
          {/* <Link to="/cart" className="fa fa-shopping-bag link higher"></Link> */}
          <i
            onClick={(e) => this.openCart()}
            className="fa fa-shopping-bag link higher"
          ></i>
          {/* </div> */}

          <div className="menu-list" id={this.state.menulistId}>
            <Link to="/" className="header-link" onClick={this.closeMenu}>
              HOME
            </Link>
            <Link
              to="/my-account/0-1"
              className="header-link"
              onClick={this.closeMenu}
            >
              MY ACCOUNT
            </Link>
            <Link
              to="/add-newrecipe"
              className="header-link"
              onClick={this.closeMenu}
            >
              ADD RECIPE
            </Link>
            <Link
              to={`/home-recipes/${this.state.user}-1`}
              className="header-link"
              onClick={this.closeMenu}
            >
              RECIPES
            </Link>
            {/* <Link
              to="/checkout"
              className="header-link"
              onClick={this.closeMenu}
            >
              checkout
            </Link> */}
            <Link to="/orders" className="header-link" onClick={this.closeMenu}>
              ORDERS
            </Link>
          </div>
        </div>
      );
    }else{
    console.log(this.state.user,"====+++------")
    return(
      <div className="side-menu">
      <div
        className="menu-circle"
        id={this.state.menuId}
        onClick={this.openMenu}
      ></div>
      <i
        className="fas fa-times"
        id={this.state.timesId}
        onClick={e=>this.closeMenu(e)}
        aria-hidden="true"
      ></i>
      <Link to={`/my-account/${this.state.user}-1`} className="fas fa-user link higher"  onClick={e=>this.closeMenu(e)}/>
      <i  className="fas fa-search link higher" />
      {/* <Link to="/cart" className="fa fa-shopping-bag link higher"></Link> */}
      <i
        onClick={(e) => this.openCart()}
        className="fa fa-shopping-bag link higher"
      ></i>
      {/* </div> */}

      <div className="menu-list" id={this.state.menulistId}>
        <Link to="/" className="header-link" onClick={this.closeMenu}>
          HOME
        </Link>
        <Link
          to="/my-account/0-1"
          className="header-link"
          onClick={this.closeMenu}
        >
          MY ACCOUNT
        </Link>
        <Link
          to="/add-newrecipe"
          className="header-link"
          onClick={this.closeMenu}
        >
          ADD RECIPE
        </Link>
        <Link
          to={`/home-recipes/${this.state.user}-1`}
          className="header-link"
          onClick={this.closeMenu}
        >
          RECIPES
        </Link>
        {/* <Link
          to="/checkout"
          className="header-link"
          onClick={this.closeMenu}
        >
          checkout
        </Link> */}
        <Link to="/orders" className="header-link" onClick={this.closeMenu}>
          ORDERS
        </Link>
      </div>
    </div>
    )

    }
  }
  header() {
    if (this.state.token) {
      return (
        <div className="menu">
        {/* <div className="menu-bar"> */}

        <Link to="/" id="logo" onClick={this.closeMenu}>
          <span className="l">R</span>
          <span>E</span>
          <span>C</span>
          <span>I</span>
          <span>P</span>
          <span>E</span>
          <span id="dote">.</span>
        </Link>
        <button onClick={(e) => this.logout(e)} className="logout link">
            LOGOUT
          </button>
        {/* <Link to="/login" className="login link">
          LOGIN
        </Link> */}
        <Link to="/signup" className="signup link" onClick={e=>this.closeMenu(e)}>
          SIGNUP
        </Link>
      </div>
        
      
      
      );
    } else {
      return (
        <div className="menu">
          {/* <div className="menu-bar"> */}

          <Link to="/" id="logo" onClick={e=>this.closeMenu(e)}>
            <span className="l">R</span>
            <span>E</span>
            <span>C</span>
            <span>I</span>
            <span>P</span>
            <span>E</span>
            <span id="dote">.</span>
          </Link>

          <Link to="/login" className="login link" onClick={e=>this.closeMenu(e)}>
            LOGIN
          </Link>
          <Link to="/signup" className="signup link" onClick={e=>this.closeMenu(e)}>
            SIGNUP
          </Link>
        </div>
      );
    }
  }

  getScrollPosition = ({ element, useWindow }) => {
    console.log("ahaaa");
    if (!isBrowser) {
      this.setState({ barPosition: "left -200vh" });
    }
    const target = element ? element.current : document.body;
    const position = target.getBoundingClientRect();
    let style = useWindow
      ? this.setState({
          barPosition: `left ${
            -70 + (window.scrollY * 100) / window.innerHeight
          }vh`,
        })
      : this.setState({
          barPosition: `left ${
            -70 + (position.top * 100) / window.innerHeight
          }vh`,
        });

    // this.setState({
    //   barPosition: `left ${-60 + (position.top * 100) / window.innerHeight}vh`,
    // });

    console.log(this.state.barPosition);
  };
  renderSocial() {
    let socialStyle = {
      backgroundPosition: this.state.barPosition,
    };
    return (
      <div className="a-tags">
        <div id="social-bar" style={socialStyle}>
          <a href="#" className="fab fa-facebook-f link"></a>
          <a href="#" className="fab fa-twitter link"></a>
          <a href="#" className="fab fa-instagram link"></a>
        </div>
      </div>
    );
  }
  renderCart() {
    if (this.props.cart !== null) {
      console.log(this.props.cart.items, "::");
      return this.props.cart.items.map((item, i) => {
        return (
          <div key={i} className="cart-each-item">
            <div className="cart-item">
              <div className="cart-item-qty">{item.quantity}</div>
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${item.unitPrice*item.quantity}</div>
              <button className="cart-item-btn" onClick={(e) => this.removeFromCart(e, item)}>
                REMOVE
              </button>
            </div>
          </div>
        );
      });
    }
  }
  removeFromCart(e, item) {
    this.props.deletFromCart(item,this.state.user);
    console.log(this.props.history, "this.props.history");
  }

  submitOrder(e) {
    console.log(this.props.auth,this.props.cart.items,"lenth,this.props.cart.items.leng")
    if(Object.keys(this.props.auth).length>0&&this.props.cart.items.length>0){
      this.props.submitOrder(this.props.cart);
    
      this.props.history.push("/checkout");
    }else  if(this.props.cart.items.leng<1&&Object.keys(this.props.auth).lenth>0){
    this.setState({ message: "there is no item in your cart" });

    }else  if(this.props.cart.items.leng>0&&Object.keys(this.props.auth).lenth<1){
      this.setState({ message: "You need to log in before checkout your cart" });
  
      }else{
        this.setState({ message: "You need to log in before checkout your cart" });

      }
   
  }
  render() {
    return (
      <div id="container">
        {renderRoutes(this.props.route.routes)}
        {this.header()}
        {this.renderSocial()}
        {this.side()}
        
        <div className="cart-page" id={this.state.cart}>
          <div className="cart-title">CART</div>
          <div className="cart-title-bar">
            <span className="cart-title-qty">QTY</span>
            <span className="cart-title-name">RECIPE NAME</span>
            <span className="cart-title-price"> PRICE</span>
            <span className="cart-title-empty"> </span>
          </div>
          <br />
          <div className="cart-slice">
            
            {this.renderCart()}
            </div>
          <br />
          <div className="cart-buttom-bar">
            <div className="cart-title-total">
              TOTAL: ${this.props.cart.total}
            </div>
          </div>
          <br />
          <button
            onClick={(e) => this.submitOrder(e)}
            className="checkout-button"
          >
            CHECKOUT
          </button>
          <div className="cart-message">{this.state.message}</div>
        </div>
        <div className="white-bottom"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, "mapStateToProps---->state.app cart");

  return {
    token: state.auth.token,
    userid: state.auth.user,
    cart: state.cart,
    auth: state.auth,
    openCart:state.openCart
  };
}
const loadedData = (store, id, auth) => {
  console.log(store, id, auth, "loadingggggggg loadedData App");
  // return store.dispatch(checkAuth(auth));
};
export default withRouter({
  // loadedData,
  component: connect(mapStateToProps, {
    loginOutAccount,
    fetchCartItems,
    deletFromCart,
    ownerCartItems,
    submitOrder ,
    closeCart
  })(App),
});
