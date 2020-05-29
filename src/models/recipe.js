const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picUrl: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
 comments: [{
      commenter:{
        type: String,
        required: true
      },
      comment:{
        type: String,
        required: true
      }
  }],
  stars:{
    type: Number,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true
});

recipeSchema.methods.addComment = function (comment,user) {
  console.log(comment,user, "recipe schema ")

  const updatedItemComments = [...this.comments];


  updatedItemComments.push({comment:comment,commenter:user});


  this.comments = updatedItemComments;
  return this.save();
};
module.exports = mongoose.model('Recipe', recipeSchema);
