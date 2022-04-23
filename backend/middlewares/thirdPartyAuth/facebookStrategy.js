const User = require("../../models/userModel");
const FacebookStrategy = require("passport-facebook").Strategy;

const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
}, (accessToken, refreshToken, profile, done) => {
    User.findById({ id: profile.id }, (err, user) => {
        if (err) return done(err, false);
        if (!user) return done(null, false);
        return done(err, user);
    });
});

module.exports = facebookStrategy;