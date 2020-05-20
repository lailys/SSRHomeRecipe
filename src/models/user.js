const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  resetToken:String,
  resetTokenEXP:Date,

  cart: {
    items: [{
      recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
      },
      name: {
        type: Schema.Types.String,
        ref: 'Recipe',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      unitPrice: {
        type: Number,
        required: true
      }
    }],
    total: {
      type: Schema.Types.Number,
      required: true
    },

  },
  orders: [{
    items: [{
      recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
      },
      name: {
        type: Schema.Types.String,
        ref: 'Recipe',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      unitPrice: {
        type: Number,
        required: true
      }
    }],
    total: {
      type: Number,
      required: true
    },
  }],


});

userSchema.methods.addToCart = function (recipe) {
  console.log(recipe, "user schema ")
  const cartRecipeIndex = this.cart.items.findIndex(cp => {
    return cp.recipeId.toString() === recipe._id.toString();
  });
  let newQuantity = 1;
  let updatedTotal = this.cart.total + recipe.price
  const updatedCartItems = [...this.cart.items];

  if (cartRecipeIndex >= 0) {
    newQuantity = this.cart.items[cartRecipeIndex].quantity + 1;
    updatedCartItems[cartRecipeIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      recipeId: recipe._id,
      name: recipe.name,
      quantity: newQuantity,
      unitPrice: recipe.price

    });
  }

  const updatedCart = {
    items: updatedCartItems,
    total: updatedTotal
  };
  this.cart = updatedCart;
  return this.save();
};
userSchema.methods.deleteFromCart = function (item) {

  const cartRecipeIndex = this.cart.items.findIndex(cp => {
    console.log(item, "-?_?_?_?_?_?", cp, "-----------------")
    return cp._id.toString() === item._id.toString();
  });
  console.log(this.cart.items[cartRecipeIndex], "cartRecipeIndex", this.cart.total, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  const total = this.cart.total - (this.cart.items[cartRecipeIndex].quantity * this.cart.items[cartRecipeIndex].unitPrice)
  console.log(total, "total00000")
  this.cart.total = total
  this.cart.items.splice(cartRecipeIndex, 1)
  return this.save();

};
userSchema.methods.addToOrder = function () {
  console.log(this.cart, "user cart   schema ")

  currentOrder = {
    item:this.cart.items,
    total: this.cart.total
  };
  console.log(currentOrder, "currentOrder")
  this.orders.push(currentOrder);
  console.log(this.orders, "currentOrder")
  this.cart = {
    items: [],
    total: 0
  }
  return this.save();
};
userSchema.methods.updateCart = function (item) {

  console.log(item, "updatecartttttt", this.cart, "cartttttt")
  const cartRecipeIndex = this.cart.items.findIndex(cp => {
    return cp.recipeId.toString() === item._id.toString();
  });
  console.log(cartRecipeIndex, "cartRecipeIndex", this.cart.total, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  if (cartRecipeIndex !== -1) {
    const total = this.cart.total - (this.cart.items[cartRecipeIndex].quantity * this.cart.items[cartRecipeIndex].unitPrice)
    console.log(total, "total00000")
    this.cart.total = total
    this.cart.items.splice(cartRecipeIndex, 1)
  }
  return this.save();

};
// userSchema.methods.authenticate = function (isLoggedIn) {

//   this.isLoggedin = isLoggedIn
//   return this.save();

// };
userSchema.methods.logout = function () {

  this.isLoggedin = false
  return this.save();

};

module.exports = mongoose.model('User', userSchema);
