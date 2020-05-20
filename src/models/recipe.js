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
//  userName: {
//     type: string,
//     required: true
//   },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
