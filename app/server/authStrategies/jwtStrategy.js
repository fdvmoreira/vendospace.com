const JwtStrategy = require("passport-jwt").Strategy;
const extractor = require('passport-jwt').ExtractJwt;
const User = require("../models/userModel");

let options = {
  "jwtFromRequest": extractor.fromAuthHeaderAsBearerToken(),
  "secretOrKey": process.env.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(options, (jwtPayload, done) => {
  try {
    return done(null, jwtPayload.user);
  } catch (error) {
    return done(error);
  }
});

module.exports = jwtStrategy;