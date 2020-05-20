import {
    POST_NEW_PASSWORD ,
    
  } from '../actions';
  
  export default (state = 0, action) => {
    switch (action.type) {
      case POST_NEW_PASSWORD :
        console.log(action.payload, "passwordupdatereducer-------->action.payload.data")
        return action.payload.passwordOwner;
      default:
        return state;
    }
  };
  