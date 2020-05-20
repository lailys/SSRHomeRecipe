import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders,ownerOrders  } from "../actions";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Orders extends Component {
  state = {
    message: "",
  };
  componentDidMount() {
    console.log("componentDidMount of orders", this.props);
    if(Object.keys(this.props.auth).length<1){
      this.setState({ message: "session has been expired, please login again"})
     
    }
    // this.props.fetchOrders();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("update orders",prevProps.orders.length ,this.props.orders.length)

  //     if(prevProps.orders.length!==this.props.orders.length){
  //       this.props.fetchOrders();
  //     }

  // }
  renderCart() {
    console.log(this.props.orders.length, "this.props.orders.length");
    if (this.props.orders.length > 0) {
      return this.props.orders.map((order, i) => {
        return (
          <div key={i}>
            <br />
            <div>ORDER# : {order._id}</div>
            <div>total:{order.total}</div>
            <a href={`/order/${order._id}`}>INVOICE</a>
          </div>
        );
      });
    }else{
      return (
        <div >
          no orders yet
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>ORDERS</h1>
        {this.renderCart()}
        <br />
        {/* <div>{this.props.cart.total}</div> */}
        <br />
        {/* <button onClick={(e) => this.submitOrder(e)}>SUBMIT ORDER</button> */}
        <div id="message">message: {this.state.message}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps---->state.orders", state);
  return {
    orders: state.orders,
    auth: state.auth,
  };
};
const loadedData = (store, id,logged,user) => {
  console.log(store, user, "loadingggggggg loadedData orders");

  // return store.dispatch(ownerOrders (user._id));
};

export default {
  // loadedData,
  component: connect(mapStateToProps, { fetchOrders })(Orders),
};
