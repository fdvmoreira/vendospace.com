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

  let userHasEmail = (profile?.emails?.[0]?.value) ? true : false;
  if (userHasEmail) {
    switch (getAuthType()) {
      case 'SIGNUP':
        User.create({
          name: profile.displayName,
          email: profile?.emails?.[0]?.value,
          passwordHash: '',
          signUpMethod: profile.provider
        }, (err, user) => {
          if (err) return done(err, false, `Error: ${err.message}`);

          if (user.createdAt.length === 0) return done(null, false, "User not created");

          Profile.create({ user: user.id, avatar: profile.photos[0].value }, (err, nprofile) => {
            if (err) return done(err, false, `Error: ${err.message}`);
          });

          Account.create({ user: user.id, type: "Personal", status: "Active" }, (err, account) => {
            if (err) return done(err, false, `Error: ${err.message}`);
          });

          return done(err, user);
        });
        break;

      case 'SIGNIN':
        User.findOne({
          email: profile?.emails?.[0]?.value,
          signUpMethod: profile.provider,
        }, (err, user) => {
          if (err) return done(err, false, `Error: ${err.message}`);
          if (!user) return done(null, false, "User not found");
          return done(err, user);
        });
        break;

      default:
        return done(null, false, "Not sure how to handle that. Intent:" + getAuthType());
    }
    return;
  }

  // If the user does not have an email address associated with their fb account
  if (!profile?.emails?.[0]?.value && profile.id) {
    return done(null, false, "Sorry, your email address is not available");
  }

  return done(null, false, "Something went wrong: Authentication failed");
});

module.exports = facebookStrategy;