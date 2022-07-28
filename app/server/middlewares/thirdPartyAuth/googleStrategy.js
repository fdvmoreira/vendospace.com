const User = require("../../models/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const DOMAIN = process.env.DOMAIN + ":" + process.env.PORT;

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${DOMAIN}/auth/google/callback`,
    scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, done) => {

    console.log(profile._json);

    User.findOne({
        name: profile._json.name,
        email: profile._json.email,
        passwordHash: "",
        signupMethod: profile.provider
    }, (err, user) => {
        return done(err, profile);
    });
});

module.exports = googleStrategy;
