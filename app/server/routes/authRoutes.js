const passport = require('passport');
const { setAuthType } = require('../config/auth.type');

const router = require('express').Router();

/**
 * get the type of authentication
 * @param {string} str 
 * @returns string
 */
const getLastWordFromPath = (str) => str?.split('\/').at(-1);

/**
 * extract authentication type from headers
 * @param {Request} req 
 * @param {Response} _res 
 * @param {Function} next 
 */
const extractAuthTypeMiddleware = (req, _res, next) => {
  switch (getLastWordFromPath(req?.headers?.referer ?? "")) {
    case 'signin':
    case 'login':
      setAuthType('SIGNIN');
      break;
    case 'register':
    case 'signup':
      setAuthType('SIGNUP');
      break;
    default:
      setAuthType('DEFAULT');
  }
  next();
}
//TODO FIXME-I am not running as I should
// media routes
router.get('/auth/google', extractAuthTypeMiddleware, passport.authenticate('google'));
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/linkedin', passport.authenticate('linkedin'));

// social media callback 
/** GOOGLE */
router.get('/auth/google/callback', passport.authenticate('google',
  {
    session: false
  }
), (req, res) => {
  if (!req.user) return res.status(204).json({ message: "Unauthorized access" })
  res.status(200).json({ message: "End of Google's ops", user: req?.user })
  //TODO send the user the front end so it can used for auth
});

/**
 * FACEBOOK
*/
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureMessage: "Faile",
  successRedirect: '/',
  successMessage: "Success",
  session: false,
  scope: ['id', 'displayName', 'photos', 'email']
}, (...args) => {

  console.log("PROFILE FACEBOOK:");
  console.log(args[1]);
}));

/** LINKEDIN */
router.get('/auth/linkedin/callback', passport.authenticate('linkedin',
  {
    failureRedirect: '/login',
    failureMessage: "Failed",
    successRedirect: '/',
    successMessage: "Success",
    session: false,
    scope: ['r_emailaddress', 'r_liteprofile']
  }, (...args) => {

    console.log("PROFILE LINKEDIN:");
    console.log(args[1]);

    // res.status(200).json(req.body);
  }));

module.exports = { router, getLastWordFromPath, extractAuthTypeMiddleware };