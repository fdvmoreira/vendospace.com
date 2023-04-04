const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
  signUpMethod: {
    type: String,
    required: true,
    enum: {
      values: ['google', 'facebook', 'linkedin', 'email'],
      message: '{VALUE} not supported here'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
