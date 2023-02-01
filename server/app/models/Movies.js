const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const moviesSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  user: {
    required: true,
    type: Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

const Movies = mongoose.model('Movies', moviesSchema)

module.exports = Movies;