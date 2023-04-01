const User = require("../models/userModel");
const FacebookStrategy = require("passport-facebook").Strategy;
const DOMAIN = process.env.DOMAIN + ":" + process.env.PORT;

const facebookStrategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${DOMAIN}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  User.findById({ id: profile.id }, (err, user) => {
    if (err) return done(err, false);
    if (!user) return done(null, false);
    return done(err, profile);
  });
});

module.exports = facebookStrategy;