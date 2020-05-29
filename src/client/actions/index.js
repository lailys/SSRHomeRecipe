import axios from 'axios'

///////////signup a new user------------------>
export const SIGNUP_NEW_USER = 'Signup_New_User';
export const signupNewUser = (data) => async (dispatch) => {

  const res = await axios.post("http://localhost:3000/auth-signup", data)
  console.log("action---->signupNewUser---->res.data", res,!res.msg)
  // if(!res.msg){
   return dispatch({
      type: SIGNUP_NEW_USER,
      payload: res.data,
    });
//   }else{
// return res.msg
//   }
 

};
///////////-------------------------------------------
///////////authenticate the user------------------>
export const AUTHENTICATE_ACCOUNT = 'Authenticate_Account';
export const authenticateAccount = (data) => async (dispatch) => {
console.log(data,"auth")
  const res = await axios.post("http://localhost:3000/auth-login", data)
  console.log("action---->authenticateAccount---->res.data.msg", res,res.data.msg)
  if(res.data.msg){
   return  dispatch({
      type: AUTHENTICATE_ACCOUNT,
      payload: res.data,
    
    });
  }else{
    localStorage.setItem('user', res.data._id);
    localStorage.setItem('token', res.data.token);
    const authData={
      token: localStorage.getItem('token'),
      user:  localStorage.getItem('user')
    }
   return  dispatch({
      type: AUTHENTICATE_ACCOUNT,
      payload: authData,
    
    });
  }

};
///////////-------------------------------------------
///////////get the login page------------------>
export const CHECK_AUTH = 'Check_Auth';
export const checkAuth = (data) => async (dispatch) => {

  console.log(data, "action ---->CHECK_AUTH ")

  dispatch({
    type: CHECK_AUTH,
    payload: data

  });

};
///////////-------------------------------------------
///////////get the login page------------------>
export const LOGIN_PAGE = 'Login_Page';
export const loginPage = () => async (dispatch) => {
  console.log('LOGIN_PAGE', "--------------------->")

  const res = await axios.get("http://localhost:3000/auth-login-page")
  console.log("action---->loginPage---->res.data", res.data)
  dispatch({
    type: LOGIN_TO_ACCOUNT,
    payload: res.data,
  });

};
///////////-------------------------------------------
///////////reset password------------------>
export const RESET_PASSWORD_REQUEST = 'Reset_Password_Request';
export const resetPasswordRequest = (data) => async (dispatch) => {
  console.log('RESET_PASSWORD_REQUEST ', data, "--------------------->")

  const res = await axios.post("http://localhost:3000/password-request", data)
  console.log("action---->resetPasswordRequest---->res.data", res.data)
  dispatch({
    type: RESET_PASSWORD_REQUEST,
    payload: res.data,
  });

};
///////////-------------------------------------------
///////////reset password------------------>
export const POST_NEW_PASSWORD = 'Post_New_Password';
export const postNewPassword = (data) => async (dispatch) => {
  console.log('POST_NEW_PASSWORD ', data, "--------------------->")



  const res = await axios.post("http://localhost:3000/post-new-password", data)
  console.log("action---->postNewPassword---->res.data", res.data)

  dispatch({
    type: POST_NEW_PASSWORD,
    payload: res.data,
  });

};
///////////-------------------------------------------
///////////get all Recipes in the list------------------>
export const FFETCH_RECIPES = 'fetch_recipes';
export const fetchRecipes = (id) => async (dispatch) => {

console.log(id,"action->id",!global.localStorage)

// if(global.localStorage){
  // if(!id){
        const AuthStr = 'Bearer '; 
    const res = await axios.get(`http://localhost:3000/home-data/${id}`)
    console.log("FFETCH_RECIPES", res, "--------------------->")
  
    dispatch({
      type: FFETCH_RECIPES,
      payload: res.data
    });

};
///////////-------------------------------------------
///////////get individual Recipe in the list------------------>
export const FFETCH_OWNER_RECIPES = 'fetch_Owner_recipes';
export const fetchOwnerRecipes = (url) => async (dispatch) => {
console.log(url,">>>>>")
  if(global.localStorage){
    const AuthStr = 'Bearer '.concat(global.localStorage.token); 
    const res = await axios.get(`http://localhost:3000/owner-alldata/${url}`,{ headers: { Authorization: AuthStr } })
    console.log("action---->fetchOwnerRecipes---->res.data", res.data)
    dispatch({
      type: FFETCH_OWNER_RECIPES,
      payload: res.data,
    });
  }else{
    const res = await axios.get(`http://localhost:3000/owner-data/${url}`)
    dispatch({
      type: FFETCH_OWNER_RECIPES,
      payload: res.data,
    });
  }

};
///////////-------------------------------------------
///////////get individual Recipe in the list------------------>
export const OWNER_RECIPES = 'Owner_recipes';
export const ownerRecipes = (id) => async (dispatch) => {

  const res = await axios.get(`http://localhost:3000/owner-data/${id}`)
  console.log("action---->fetchOwnerloadRecipes---->res.data", res.data)

  dispatch({
    type: OWNER_RECIPES,
    payload: res.data,
  });

};
///////////-------------------------------------------
///////////get individual Recipe in the list------------------>
export const FFETCH_RECIPE_DETAIL = 'fetch_recipe_detail';
export const fetchRecipeDetail = (id) => async (dispatch) => {

  const res = await axios.get(`http://localhost:3000/data/${id}`)
  console.log("action---->fetchRecipeDetail---->res.data", res)

  dispatch({
    type: FFETCH_RECIPE_DETAIL,
    payload: res.data,
  });

};
///////////-------------------------------------------

///////////create a new recipe------------------>
export const POST_NEW_RECIPE = 'Post_New_Recipe';
export const postNewRecipe = (data) => {
  console.log("POST_NEW_RECIPE", data, "--------------------->")
  const AuthStr = 'Bearer '.concat(global.localStorage.token); 
console.log(AuthStr,"AuthStr")
  return (dispatch) => {
    return axios.post('http://localhost:3000/data', data,{ headers: { Authorization: AuthStr } })

  };
};
///////////-------------------------------------------
///////////edit individual Recipe in the list------------------>
export const EDIT_RECIPE = 'edit_recipe';
export const editRecipe = (data, id) => {
  console.log("EDIT_RECIPE", data, id, "--------------------->")
  const AuthStr = 'Bearer '.concat(global.localStorage.token); 
  console.log(AuthStr,"AuthStr")
  return (dispatch) => {
    return axios.post(`http://localhost:3000/data/${id}`, data,{ headers: { Authorization: AuthStr } })
  };

};
///////////-------------------------------------------
///////////delete a  recipe------------------>
export const DELETE_RECIPE = 'Delete_Recipe';
export const deleteRecipe = (data) => {
  console.log("DELETE_RECIPE", data, "--------------------->")
  const AuthStr = 'Bearer '.concat(global.localStorage.token); 
  console.log(AuthStr,"AuthStr")
  return (dispatch) => {
    return axios.post(`http://localhost:3000/delete-data/${data._id}`, data,{ headers: { Authorization: AuthStr } })
  };

};
///////////-------------------------------------------
///////////open cart------------------>
export const OPEN_CART = 'Open_Cart';
export const openCart = () => async (dispatch) => {

  localStorage.setItem('cart', "1");
  console.log(localStorage.getItem('cart')," console.log(localStorage.getItem('cart'))")
  dispatch({
    type:  OPEN_CART ,
    payload: localStorage.getItem('cart')
  });
}
///////////-------------------------------------------
///////////close cart------------------>
export const CLOSE_CART = 'Close_Cart';
export const closeCart = () => async (dispatch) => {

  localStorage.removeItem('cart');
  console.log(localStorage.getItem('cart')," console.log(localStorage.getItem('cart'))-----")
  dispatch({
    type: CLOSE_CART,
    payload: localStorage.getItem('cart')
  });
}
///////////-------------------------------------------
///////////fetch all recipes in the cart------------------>
export const FETCH_CART_ITEMS = 'Fetch_Cart_Items';
export const fetchCartItems = () => async (dispatch) => {

  const AuthStr = 'Bearer '.concat(global.localStorage.token); 
  console.log(AuthStr,"AuthStr")
  const res = await axios.get("http://localhost:3000/cart-items",{ headers: { Authorization: AuthStr } })
  console.log("action---->fetchCartItems---->res.data", res.data)
  dispatch({
    type: FETCH_CART_ITEMS,
    payload: res.data,
  });
};
///////////-------------------------------------------
///////////fetch all recipes in the cart------------------>
export const OWNER_CART_ITEMS = 'Owner_Cart_Items';
export const ownerCartItems = (id) => async (dispatch) => {

  const res = await axios.get(`http://localhost:3000/cart-items/${id}`,{ headers: { Authorization: AuthStr } })
  console.log("action---->fetchCartItems---->res.data", res.data)

  dispatch({
    type: FETCH_CART_ITEMS,
    payload: res.data,
  });
};
///////////-------------------------------------------
///////////add a recipe to cart------------------>
export const ADD_TO_CART = 'Add_To_Cart';
export const addToCart = (data) => {
  console.log("ADD_TO_CART", data, "--------------------->")
  const AuthStr = 'Bearer '.concat(global.localStorage.token); 
  console.log(AuthStr,"AuthStr")
  return (dispatch) => {
    axios.post(`http://localhost:3000/cart-items`, data,{ headers: { Authorization: AuthStr } })
      .then(response => {
        console.log(response, "response")
        dispatch(fetchCartItems());
      })
  };

};
///////////-------------------------------------------
///////////remove items from  cart------------------>
export const DELETE_FROM_CART = 'Delete_From_Cart';
export const deletFromCart = (data,id) => {
  console.log('DELETE_FROM_CART', data,id, "--------------------->")

  return (dispatch) => {
    return axios.post("http://localhost:3000/delete-from-cart", {data,id})
      .then(response => {
        dispatch(fetchCartItems());
      })
  };

};
///////////-------------------------------------------
///////////submit a cart to orders------------------>
export const SUBMIT_ORDER = 'Submit_Order';
export const submitOrder = (data) => {
  console.log('SUBMIT_ORDER', data, "--------------------->")

  return (dispatch) => {
    return axios.post("http://localhost:3000/submit-order", data)
      .then(response => {
        console.log(response, "response")
        dispatch(fetchOrders());
      })

  };

};
///////////-------------------------------------------

///////////fetch orders of a user------------------>
export const FETCH_ORDERS = 'Fetch_Orders';
export const fetchOrders = () => async (dispatch) => {

  const res = await axios.get("http://localhost:3000/submit-order")
  console.log("action---->fetchOrders---->res.data", res.data)

  dispatch({
    type: FETCH_ORDERS,
    payload: res.data,
  });

};
///////////-------------------------------------------
///////////get individual Recipe in the list------------------>
export const OWNER_ORDERS = 'Owner_Orders';
export const ownerOrders = (id) => async (dispatch) => {
  console.log(`http://localhost:3000/submit-order/${id}}`, "`http://localhost:3000/owner-orders/${id}:${url}}`")
  const res = await axios.get(`http://localhost:3000/submit-order/${id}`)
  console.log("action---->fetchOwnerRecipes---->res.data", res.data)

  dispatch({
    type: OWNER_ORDERS ,
    payload: res.data,
  });

};
///////////-------------------------------------------
///////////post Comment------------------>
export const ADD_COMMENT = 'Add_Comment';
export const addComment = (data,id,userId) => async (dispatch) => {
  console.log("ADD_COMMENT", data,id,userId, "--------------------->")
//   const AuthStr = 'Bearer '.concat(global.localStorage.token); 
// console.log(AuthStr,"AuthStr")
//   return (dispatch) => {
//     return axios.post('http://localhost:3000/data', data,{ headers: { Authorization: AuthStr } })

//   };
const res = await axios.post('http://localhost:3000/submit-comment', {data,id,userId})
console.log("action---->ADD_COMMENT---->res.data", res)

};
///////////-------------------------------------------
///////////fetchComments------------------>

///////////-------------------------------------------
///////////authenticate the user------------------>
export const LOGIN_OUT_ACCOUNT = 'Login_Out_Account';
export const loginOutAccount = () => async (dispatch) => {
  console.log('LOGIN_out_ACCOUNT', "--------------------->")

  // const res = await axios.post("http://localhost:3000/auth-logout")
  global.localStorage.clear();
  console.log("action---->loginOutAccount---->res.data", global.localStorage)

  const authData={
    token: localStorage.getItem('token'),
    user:  localStorage.getItem('user')
  }
 
  dispatch({
    type: LOGIN_OUT_ACCOUNT,
    payload: authData,
  });


};
///////////-------------------------------------------
