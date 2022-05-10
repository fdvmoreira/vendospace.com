const User = require("../../models/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/google/callback",
    scope: ['profile'],
}, (accessToken, refreshToken, profile, done) => {
    User.findById({ id: profile.id }, (err, user) => {
        if (err) return done(err, false);
        if (!user) return done(null, false);
        return done(err, user);
    });
});

module.exports = googleStrategy;