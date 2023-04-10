const passport = require('passport');
const { setAuthType } = require('../config/auth.type');
const path = require('path');

const router = require('express').Router();
const failureRidrect = path.join(__dirname, '../views/auth-failure.html');
const successRidrect = path.join(__dirname, '../views/auth-success.html');


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

// media routes
router.get('/auth/google', extractAuthTypeMiddleware, passport.authenticate('google'));
router.get('/auth/facebook', extractAuthTypeMiddleware, passport.authenticate('facebook'));
router.get('/auth/linkedin', extractAuthTypeMiddleware, passport.authenticate('linkedin'));

// social media callback 
/**
 * GOOGLE 
 */
router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, _info, _status) => {
    if (!user || err) {
      res.sendFile(failureRidrect);
    }

    if (user) {
      res.sendFile(successRidrect);
    }

    next();
  })(req, res, next)
});

/**
 * FACEBOOK
 */
router.get('/auth/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user, _info, _status) => {
    if (!user || err) {
      res.sendFile(failureRidrect);
    }

    if (user) {
      res.sendFile(successRidrect);
    }

    next();
  })(req, res, next)
});

/**
 * LINKEDIN 
 */
router.get('/auth/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, _info, _status) => {
    if (!user || err) {
      res.sendFile(failureRidrect);
    }

    if (user) {
      res.sendFile(successRidrect);
    }

    next();
  })(req, res, next)

});

module.exports = { router, getLastWordFromPath, extractAuthTypeMiddleware };