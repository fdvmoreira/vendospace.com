const { getAuthType } = require("../config/auth.type");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const Account = require("../models/accountModel");
const FacebookStrategy = require("passport-facebook").Strategy;
const DOMAIN = process.env.DOMAIN + ":" + process.env.PORT;

const facebookStrategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${DOMAIN}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email'],
}, (_accessToken, _refreshToken, profile, done) => {

  if (profile?.email) {
    if (getAuthType() === 'SIGNUP') {
      User.create({
        name: profile.displayName,
        email: profile?.email,
        passwordHash: '',
        signUpMethod: profile.provider
      }, (err, user) => {
        // Return error
        if (err) return done(err);

        // User not created
        if (user.createdAt.length === 0) return done(null, false);

        // User created successfully
        // -Now create a new profile
        Profile.create({ user: user.id, avatar: profile.photos[0].value }, (err, nprofile) => {
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
        email: profile?.email,
        signUpMethod: profile.provider,
      }, (err, user) => {
        if (err) return done(err, false, "Error " + err.message);
        if (!user) return done(null, false, "User not found");
        return done(err, user);
      });
    }
  }

  // If the user does not have an email address associated with their fb account
  if (!profile?.email && profile.id) {
    return done(null, false, "Sorry: Your email address is not available");
  }

  if (!['signin', 'signup'].includes(getAuthType().toLocaleLowerCase())) {
    return done(null, false, "I am not sure what is your intention!!!");
  }
});

module.exports = facebookStrategy;