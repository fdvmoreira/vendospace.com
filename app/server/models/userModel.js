const { Schema, model, models } = require('mongoose');
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
  return bcrypt.compareSync(password, this.passwordHash);
}

/**
 * hash the password using prev save middleware
 */
userSchema.pre('save', function (next) {
  let user = this;
  const SALT_ROUNDS = 10;
  if (user.signUpMethod == 'email') {
    bcrypt.hash(user.passwordHash, SALT_ROUNDS, (err, hash) => {
      if (err) next(new Error(err));
      if (hash) user.passwordHash = hash;
      next();
    });
  }
});

userSchema.pre('save', function (next) {
  const user = this;

  models.User.findOne({ email: user.email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      const error = new Error('Email address already exists.');
      error.name = 'DuplicateEmailError';
      return next(error);
    }

    next();
  });
});

module.exports = model('User', userSchema);
