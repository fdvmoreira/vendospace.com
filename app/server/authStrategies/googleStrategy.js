const User = require("../models/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const DOMAIN = process.env.DOMAIN + ":" + process.env.PORT;

const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${DOMAIN}/auth/google/callback`,
  scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, done) => {

  console.log(profile._json); // Ensure that the user registered before authenticating

  User.findOne({
    name: profile._json.name,
    email: profile._json.email,
    passwordHash: "",
    signupMethod: profile.provider
  }, (err, user) => {
    if (err) return done(err);
    console.log(user);
    return done(err, user);

  });
});

module.exports = googleStrategy;

// Ditermine if the auth was from login or signup request
// Make request to 3rd party api and authenticate with them
// get the token sent by auth provider
// check if the system has the user
// if so
// generate jwt token or (research if the token sent by auth provider can be use as jwt)
// send to client to be sent in the Authorization header
// check if the token is valid every time the user asks for resource
// when the token because invalid or use logs out send the user to login page
//
