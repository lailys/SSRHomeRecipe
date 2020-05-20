const express = require('express')
const router = express.Router()
const pageController = require('../controllers/page')
const User = require('../models/user')
const {
  check,
  body
} = require('express-validator')
const Recipe = require('../models/recipe')
const isAuth = require('../middleware/is-auth')



///////////Recipes----------------->
router.get('/home-data/:_id', pageController.getRecipes)
router.get('/owner-alldata/:_id', pageController.getOwnerRecipes)
router.get('/owner-data/:_id', pageController.getOwnerRecipesLoad)
router.get('/data/:_id', pageController.getRecipe)
router.post('/data',
check('name').trim().isLength({min:2}),
check('description').trim().isLength({min:2}),
isAuth,pageController.postRecipe)
router.post('/data/:_id',isAuth, pageController.postEditRecipe)
router.post('/delete-data/:_id',isAuth, pageController.postDeleteRecipe)

///////////cart------------------->
router.get('/cart-items',isAuth, pageController.getCart)
router.get('/cart-items/:_id', pageController.ownerCart)
router.post('/cart-items',isAuth, pageController.postCart)
router.post('/delete-from-cart', pageController.deleteFromCart)

///////////orders------------------>
router.get('/submit-order', pageController.getSubmitOrder)
router.get('/submit-order/:_id', pageController.getOwnerOrder)
router.post('/submit-order', pageController.postSubmitOrder)
router.get('/order/:orderId', pageController.getInvoice)

///////////auth-------------------->

router.post('/auth-signup',
  check('email').isEmail()
  .withMessage('Please add valid email')
  .custom((value, {
    req
  }) => {
    console.log(value, "...", req.body.email)

    return User.find({
        email: value
      })
      .then(user => {
        console.log(user, "???")
        if (user.length > 0) {
          return Promise.reject(
            'Email exists already, please pick a different email'
          )
        }
      })
  }).normalizeEmail(),
  body('password', 'Please choose a password with minimum 8 charachters which includes just text and numbers')
  .isLength({
    min: 8
  }).isAlphanumeric().trim(),
  body('confirmPassword').trim()
  .custom((value, {
    req
  }) => {
    if (value !== req.body.password) {
      throw new Error('passwords have to match')
    } else {
      return true
    }
  }),
  pageController.postUser);
  router.post('/auth-login',
  check('email').isEmail().normalizeEmail(),
  body('password')
  .isLength({
    min: 8
  }).isAlphanumeric().trim()
  , 
  pageController.postLogin);
  router.post('/password-request', pageController.postNewPasswordRequest);
  router.post('/post-new-password', pageController.postNewPassword);
  router.post('/auth-logout', pageController.postLogout);
  

  router.get('/auth-login', pageController.getAuth);
  router.get('/auth-login-page', pageController.getLogin);



  
  module.exports = router;
  