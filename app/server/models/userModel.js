const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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

userSchema.methods.isPasswordValid = function (password) {
  bcrypt.compare(password, this.passwordHash, (err, same) => {
    if (err) return false;
    if (same) return true;
  });
}

module.exports = model('User', userSchema);
