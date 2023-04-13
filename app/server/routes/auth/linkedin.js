const passport = require('passport');
const path = require('path');
const { extractAuthTypeMiddleware } = require('../../middlewares/lib/extractAuthTypeFromReqHeader');
const router = require('express').Router();
const failureRidrect = path.join(__dirname, '../../views/auth-failure.html');
const successRidrect = path.join(__dirname, '../../views/auth-success.html');

router.get('/auth/linkedin', extractAuthTypeMiddleware, passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, _info, _status) => {

    console.log(err);
    console.log(user);
    console.log(_info);
    console.log(_status);


    if (!user || err) {
      res.sendFile(failureRidrect);
    }

    if (user) {
      res.sendFile(successRidrect);
    }

    next();
  })(req, res, next)

});

module.exports = router;
