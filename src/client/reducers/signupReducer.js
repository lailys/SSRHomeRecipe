import { SIGNUP_NEW_USER} from '../actions';



export default (state="0", action) => {


  switch (action.type) {
    case SIGNUP_NEW_USER :
      console.log(action.payload,"SIGNUP_NEW_USER payload")
      return action.payload.newUser ;
    default:
      return state;
  }
};