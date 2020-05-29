import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import App from "./App";
import RecipePage from './pages/RecipePage';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddRecipe from "./pages/AddRecipe";
import updateRecipe from "./pages/updateRecipe";
import MyAccount from "./pages/MyAccount";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordReq from "./pages/ResetPasswordReq";
import AccountDetail from "./pages/AccountDetail";
import Checkout from "./pages/Checkout";


export default [{
    ...App,
    routes: [


      {
        ...AddRecipe,
        path: '/add-newrecipe',
      },
      {
        ...Detail,
        path: '/recipes/:_id',
        exact: true,

      },
      {
        ...AccountDetail,
        path: '/myrecipes/:_id',
        exact: true,

      },
      {
        ...RecipePage,
        path: '/home-recipes/:_id',
        exact: true,
      },
      {
        ...updateRecipe,
        path: '/edit-recipe/:_id',
        exact: true,
      },
      // {
      //   ...Cart,
      //   path: '/cart',
      //   exact: true,
      // },
      {
        ...Checkout,
        path: '/checkout',
        exact: true,
      },
      {
        ...Orders,
        path: '/orders',
        exact: true,
      },
      {
        ...MyAccount,
        path: '/my-account/:_id',
        exact: true,
      },
      {
        ...Login,
        path: '/login',
        exact: true,
      },
      {
        ...Signup,
        path: '/signup',
        exact: true,
      },
      {
        ...ResetPasswordReq,
        path: '/reset-password-request',
        exact: true,
      },
      {
        ...ResetPassword,
        path: '/reset-password/:token',
        exact: true,
      },
      {
        ...Home,
        path: '/',
        exact: true,

      },
      {
        ...NotFound
      }

    ]
  }

]
