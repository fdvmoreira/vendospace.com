const JwtStrategy = require("passport-jwt").Strategy;
const extractor = require('passport-jwt').ExtractJwt;
const User = require("../../models/userModel");

let options = {
    "jwtFromRequest": extractor.fromAuthHeaderAsBearerToken(),
    "secretOrKey": process.env.JWT_SECRET
};

const strategy = new JwtStrategy(options, (jwtPayload, done) => {
    User.findById({ id: jwtPayload.id }, (err, user) => {
        if (this.err) return done(err, false);
        if (!user) return done(null, false);
        return done(err, user);
    });
});

module.exports = strategy;