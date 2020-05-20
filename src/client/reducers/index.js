import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import detailReducer from './detailReducer';
import cartReducer from './cartReducer';
import ordersReducer from './ordersReducer';
import authReducer from './authReducer';
import signupReducer from './signupReducer';
import passwordUpdateReducer from './passwordUpdateReducer';
import passwordRequestReducer from './passwordRequestReducer';
import ownerReducer from './ownerReducer';
// import csrfReducer from './csrfReducer';


export default combineReducers({
  recipes:recipesReducer,
  detail:detailReducer,
  cart:cartReducer,
  orders:ordersReducer,
  auth:authReducer,
  newUser:signupReducer,
  passwordOwner:passwordUpdateReducer,
  exist:passwordRequestReducer,
  ownerRecipes:ownerReducer
  // csrf:csrfReducer
});