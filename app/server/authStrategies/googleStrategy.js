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

  let userHasEmail = (profile?._json?.email) ? true : false;
  if (userHasEmail) {
    switch (getAuthType()) {
      case 'SIGNUP':
        User.create({
          name: profile._json.name,
          email: profile._json.email,
          passwordHash: '',
          signUpMethod: profile.provider
        }, (err, user) => {
          if (err) return done(err, false, `Error: ${err.message}`);

          if (user.createdAt.length === 0) return done(null, false), "User not created";

          Profile.create({ user: user.id, avatar: profile._json.picture }, (err, nprofile) => {
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
          email: profile._json.email,
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

  return done(null, false, "Something went wrong: Authentication failed");
});

module.exports = googleStrategy;