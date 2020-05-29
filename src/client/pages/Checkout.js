import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCartItems, submitOrder, ownerCartItems } from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Checkout extends Component {
  state = {
    payment: {},
    message:""
  };
  componentDidMount() {
    console.log("componentDidMount of cart", this.props);
    if (Object.keys(this.props.auth).length < 1) {
      this.props.history.push("/login");
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
          <div key={i} className="checkout-each-item">
            <div className="checkout-item">
              <div className="checkout-title-qty">quantity:{item.quantity}</div>
              <div className="checkout-title-name">{item.name}</div>
              <div className="checkout-title-price">{item.price}</div>
              <button onClick={(e) => this.removeFromCart(e, item)}>
                REMOVE
              </button>
            </div>
          </div>
        );
      });
    }
  }
  paymentForm() {
    return (
      <form className="payment-form">
        <input
          onChange={(e) => this.createRecipe(e)}
          id="name"
          type="text"
          placeholder="name"
        />
        <br />
        <br />
        <input
          onChange={(e) => this.createRecipe(e)}
          id="creditCard"
          type="text"
          placeholder="Credit card number"
        />
        <br />
      </form>
    );
  }
  createRecipe = (e) => {
    console.log(this.state.payment, "this.state.payment");
    let payment = Object.assign({}, this.state.payment);
    payment[e.target.id] = e.target.value;

    this.setState({
      payment,
    });
  };
  submitOrder(e) {
    this.setState({ message: "We dont offer checkout yet" });

    // this.props.submitOrder(this.props.cart);
    // this.props.history.push("/orders");
  }

  render() {
    return (
      <div className="checkout-page">
        <div className="checkout-title">CHECKOUT</div>

        {/* <div className="checkout-title-bar">
            <span className="checkout-title-qty">QTY</span>
            <span className="checkout-title-name">RECIPE</span>
            <span className="checkout-title-price"> PRICE</span>
            <span className="checkout-title-empty"> </span>
          </div> */}
        <br />
        <div className="checkout-slice">{this.renderCart()}</div>
        <br />
        <div className="checkout-buttom-bar">
          <div className="checkout-title-total">
            TOTAL: ${this.props.cart.total}
          </div>
        </div>

        <div className="checkout-payment">{this.paymentForm()}</div>
        <button onClick={(e) => this.submitOrder(e)} className="order-button">
          PLACE ORDER
        </button>
        <div className="cart-message">{this.state.message}</div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps---->state.checkout", state);

  return {
    cart: state.cart,
    auth: state.auth,
  };
}

const loadedData = (store, id, logged, user) => {
  console.log(store, id, logged, user, "loadingggggggg loadedData checkout");
  // return store.dispatch(ownerCartItems(user._id));
};
export default withRouter({
  loadedData,
  component: connect(mapStateToProps, {
    fetchCartItems,
    ownerCartItems,
    submitOrder,
  })(Checkout),
});
