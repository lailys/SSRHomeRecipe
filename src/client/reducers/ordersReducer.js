import {
  FETCH_ORDERS,
  OWNER_ORDERS 
} from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      console.log(action.payload.data, "ordersreducer-------->action.payload.data")
      return action.payload.orders;
    case OWNER_ORDERS :
      console.log(action.payload, "ordersreducer-------->action.payload.data")
      return action.payload.orders;
    default:
      return state;
  }
};
