import {  OPEN_CART,CLOSE_CART   } from '../actions';

export default (state = {items:[],total:0}, action) => {
  switch (action.type) {
    case  CLOSE_CART  :
        console.log(action.payload,"CLOSE_CART -------->action.payload.data")
      return action.payload
    case  OPEN_CART  :
        console.log(action.payload,"open_CART -------->action.payload.data")
      return action.payload
    default:
      return state;
  }
};