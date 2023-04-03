const { getAuthType } = require("../config/auth.type");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const Account = require("../models/accountModel");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const DOMAIN = process.env.DOMAIN + ":" + process.env.PORT;

const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${DOMAIN}/auth/google/callback`,
  scope: ['profile', 'email'],
}, (_accessToken, _refreshToken, profile, done) => {

  if (profile._json.email) {
    if (getAuthType() === 'SIGNUP') {
      User.create({
        name: profile._json.name,
        email: profile._json.email,
        passwordHash: '',
        signUpMethod: profile.provider
      }, (err, user) => {
        // Return error
        if (err) return done(err);

        // User not created
        if (user.createdAt.length === 0) return done(null, false);

        // User created successfully
        // -Now create a new profile
        Profile.create({ user: user.id, avatar: profile._json.picture }, (err, nprofile) => {
          if (err) return done(err);
        });
        //TODO: Make the type of account change dynamically
        // -Now create a new Account
        Account.create({ user: user.id, type: "Personal", status: "Active" }, (err, account) => {
          if (err) return done(err);
        });
        // Return the user created
        return done(err, user);
      });
    }

    // User already exists fetch it
    if (getAuthType() === 'SIGNIN') {
      User.findOne({
        email: profile._json.email,
      }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        return done(err, user);
      });
    }
  }

  if (!['signin', 'signup'].includes(getAuthType().toLocaleLowerCase())) {
    done(new Error("I am not sure what is your intention!!!"), false);
  }
});

module.exports = googleStrategy;