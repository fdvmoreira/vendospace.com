const { getAuthType } = require("../config/auth.type");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const Account = require("../models/accountModel");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const DOMAIN = process.env.DOMAIN + ":" + process.env.PORT;

const linkedInStrategy = new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: `${DOMAIN}/auth/linkedin/callback`,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, (_accessToken, _refreshToken, profile, done) => {

  if (profile.emails[0].value) {
    if (getAuthType() === 'SIGNUP') {
      User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
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
        email: profile.emails[0].value,
        signUpMethod: profile.provider,
      }, (err, user) => {
        if (err) return done(err, false, "Error " + err.message);
        if (!user) return done(null, false, "User not found");
        return done(err, user);
      });
    }
  }

  if (!['signin', 'signup'].includes(getAuthType().toLocaleLowerCase())) {
    return done(null, false, "I am not sure what is your intention!!!");
  }
});

module.exports = linkedInStrategy;