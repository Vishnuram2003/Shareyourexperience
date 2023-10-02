const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true,
      // minlength:[8,"Minimum length should be 8"],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', Userschema);
