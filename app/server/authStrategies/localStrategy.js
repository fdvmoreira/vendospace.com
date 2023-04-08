const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const Profile = require("../models/profileModel");
const Account = require("../models/accountModel");

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
},
  (req, email, password, done) => {
    const path = req.route.path;
    const { "signup-method": signUpMethod, name } = req.body;

    if (path && path.includes("login")) { // login
      User.findOne({ email }, (err, user) => {
        if (err) return done(err, false, `Error: {err.message}`);
        if (!user) return done(null, false, "Error: user not found");

        if (!user.isPasswordValid(password)) {
          return done(null, false, "Error: Credentials do not match");
        }
        return done(null, user);
      });

    } else if (path && path.includes("signup")) { // Register user

      User.create({ name, email, signUpMethod, passwordHash: password }, (err, user) => {
        if (err) return done(err, false, `Error: ${err.message}`);
        if (!user) return done(null, false, "Error: user not created");

        // User not created
        if (user.createdAt.length === 0) return done(null, false);

        // User created successfully
        // -Now create a new profile
        Profile.create({ user: user.id }, (err, nprofile) => { // TODO: profile photo
          if (err) return done(err, false, `Error: ${err.message}`);
        });
        //TODO: Make the type of account change dynamically
        // -Now create a new Account
        Account.create({ user: user.id, type: "Personal", status: "Active" }, (err, account) => {
          if (err) return done(err, false, `Error: ${err.message}`);
        });
        // Return the user created
        return done(err, user);

      });
    } else {
      return done(new Error("Route not found in header object"));
    }

  });

module.exports = localStrategy; 