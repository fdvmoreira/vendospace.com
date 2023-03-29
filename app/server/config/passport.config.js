const passport = require("passport");

const jwtStrategy = require("../authStrategies/jwtStrategy")
const googleStrategy = require("../authStrategies/googleStrategy");
const facebookStrategy = require("../authStrategies/facebookStrategy");
const linkedInStrategy = require("../authStrategies/linkedInStrategy");

passport.use(jwtStrategy);
passport.use(linkedInStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
