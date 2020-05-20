import {
    RESET_PASSWORD_REQUEST ,
    
  } from '../actions';
  
  export default (state = 0, action) => {
    switch (action.type) {
      case RESET_PASSWORD_REQUEST :
        console.log(action.payload, "passwordreducer-------->action.payload.data")
        return action.payload.exist;
      default:
        return state;
    }
  };
  