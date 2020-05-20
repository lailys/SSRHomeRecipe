import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCartItems, deletFromCart, ownerCartItems } from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Cart extends Component {
  state={
    message:""
  }
  componentDidMount() {
    console.log("componentDidMount of cart", this.props);
    if(Object.keys(this.props.auth).length<1){
      this.setState({ message: "session has been expired, please login again"})
     
    }
    this.props.fetchCartItems();
    this.setState({ total: this.props.cart.total });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("cart update", prevProps.cart.total, this.props.cart.total);
    if (prevProps.cart.total !== this.props.cart.total) {
      this.props.fetchCartItems();
    }
  }
  renderCart() {
    if (this.props.cart !== null) {
      console.log(this.props.cart.items, "::");
      return this.props.cart.items.map((item, i) => {
        return (
          <div key={i}>
            <br />
            <div>{item.name}</div>
            <div>quantity:{item.quantity}</div>
            <button onClick={(e) => this.removeFromCart(e, item)}>
              REMOVE
            </button>
          </div>
        );
      });
    }
  }
  removeFromCart(e, item) {
    this.props.deletFromCart(item);
    console.log(this.props.history, "this.props.history");
  }

  submitOrder(e) {
    // this.props.submitOrder(this.props.cart);
    // this.props.history.push("/checkout");
    this.setState({message:"there is no checkout service at the moment"})
  }

  render() {
    return (
      <div>
        <h1>CART</h1>
        {this.renderCart()}
        <br />
        <div>{this.props.cart.total}</div>
        <br />
        <button onClick={(e) => this.submitOrder(e)}>CHECKOUT</button>
        <div className="message">{this.state.message}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps---->state.cart", state);
  
  return {
    cart: state.cart,
    auth:state.auth
  };
}

const loadedData = (store, id,logged,user) => {
  console.log(store, id,logged,user, "loadingggggggg loadedData Cart");
  // return store.dispatch(ownerCartItems(user._id));
};
export default withRouter({
  // loadedData,
  component: connect(mapStateToProps, {
    fetchCartItems,
    deletFromCart,
    // ownerCartItems,
  })(Cart),
});
