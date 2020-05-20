import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCartItems, submitOrder, ownerCartItems } from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Checkout extends Component {
  state = {
    payment: {},
  };
  componentDidMount() {
    console.log("componentDidMount of cart", this.props);
    if (!this.props.auth) {
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
  paymentForm() {
    return (
      <form>
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
      //   <form onSubmit={} >
      //   <input
      //     onChange={(e) => this.createRecipe(e)}
      //     id="name"
      //     type="text"
      //     placeholder="name"
      //   />
      //   <br />
      //   <br />
      //   <input
      //     onChange={(e) => this.createRecipe(e)}
      //     id="creditCard"
      //     type="text"
      //     placeholder="Credit card number"
      //   />
      //   <br />

      // </form>
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
    this.props.submitOrder(this.props.cart);
    this.props.history.push("/orders");
  }

  render() {
    return (
      <div>
        <h1>checkout</h1>
        <div className="order-review">
          {this.renderCart()}
          <div>{this.props.cart.total}</div>
        </div>
        <div className="checkout-payment">{this.paymentForm()}</div>
        <button
          onClick={(e) => this.submitOrder(e)}
          className="checkout-button"
        >
          PLACE ORDER
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps---->state.cart", state);

  return {
    cart: state.cart,
    auth: state.auth,
  };
}

const loadedData = (store, id, logged, user) => {
  console.log(store, id, logged, user, "loadingggggggg loadedData Cart");
  return store.dispatch(ownerCartItems(user._id));
};
export default withRouter({
  loadedData,
  component: connect(mapStateToProps, {
    fetchCartItems,
    ownerCartItems,
    submitOrder,
  })(Checkout),
});
