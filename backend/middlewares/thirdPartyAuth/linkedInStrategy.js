const User = require("../../models/userModel");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

const linkedInStrategy = new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
}, (accessToken, refreshToken, profile, done) => {
    User.findById({ id: profile.id }, (err, user) => {
        if (err) return done(err, false);
        if (!user) return done(null, false);
        return done(err, user);
    });
});

module.exports = linkedInStrategy;