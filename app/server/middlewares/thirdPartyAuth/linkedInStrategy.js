const User = require("../../models/userModel");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const mongoose = require('mongoose');
const DOMAIN = process.env.DOMAIN + ":" + process.env.PORT;

const linkedInStrategy = new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${DOMAIN}/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_liteprofile'],
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);

    // const id = mongoose.Types.ObjectId(profile.id);

    User.findOne({ email: profile.emails[0].value }, (err, user) => {
        return done(err, profile);
    });
});

module.exports = linkedInStrategy;