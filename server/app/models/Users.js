const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  props: {
    required: false,
    type: Object
  },
});

const User = mongoose.model('User', userSchema)

module.exports = User;