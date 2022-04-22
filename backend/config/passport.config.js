const passport = require("passport");

const jwtStrategy = require("../middlewares/thirdPartyAuth/jwtStrategy")
const googleStrategy = require("../middlewares/thirdPartyAuth/googleStrategy");
const facebookStrategy = require("../middlewares/thirdPartyAuth/facebookStrategy");
const linkedInStrategy = require("../middlewares/thirdPartyAuth/linkedInStrategy");

passport.use(jwtStrategy);
passport.use(linkedInStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
