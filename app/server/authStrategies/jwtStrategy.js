const JwtStrategy = require("passport-jwt").Strategy,
  extractor = require('passport-jwt').ExtractJwt;
const User = require("../models/userModel");

let options = {
  "jwtFromRequest": extractor.fromAuthHeaderAsBearerToken(),
  "secretOrKey": process.env.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(options, (jwtPayload, done) => {
  // TODO: fech user, profile and account to save on the client side for messaging and posting
  User.findById({ _id: jwtPayload.id }, (err, user) => {
    if (err) return done(err, false);
    if (!user) return done(null, false);
    return done(err, user);
  });
});

module.exports = jwtStrategy;