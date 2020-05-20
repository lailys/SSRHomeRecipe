import { LOGIN_PAGE,AUTHENTICATE_ACCOUNT,CHECK_AUTH,LOGIN_OUT_ACCOUNT} from '../actions';



export default (state={}, action) => {


  switch (action.type) {
    case LOGIN_PAGE :
      console.log(action.payload,"LOGIN_PAGE payload")
      return action.payload.login ;
    case AUTHENTICATE_ACCOUNT :
      console.log(action.payload,"AUTHENTICATE_ACCOUNT payload")
      return action.payload;
    case CHECK_AUTH :
      console.log(action.payload,"CHECK_AUTH payload")
      return action.payload;
    case LOGIN_OUT_ACCOUNT :
      console.log(action.payload,"LOGIN_OUT_ACCOUNT payload")
      return action.payload;
      
    default:
      return state;
  }
};