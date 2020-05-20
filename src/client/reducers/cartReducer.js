import {  FETCH_CART_ITEMS  } from '../actions';

export default (state = {items:[],total:0}, action) => {
  switch (action.type) {
    case  FETCH_CART_ITEMS :
        console.log(action.payload,"cartreducer-------->action.payload.data")
      return action.payload.cart?action.payload.cart:{items:[],total:0};
    default:
      return state;
  }
};