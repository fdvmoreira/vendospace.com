const passport = require('passport');
const router = require('express').Router();
const path = require('path');
const { extractAuthTypeMiddleware } = require('../../middlewares/lib/extractAuthTypeFromReqHeader');
const failureRidrect = path.join(__dirname, '../../views/auth-failure.html');
const successRidrect = path.join(__dirname, '../../views/auth-success.html');

router.get('/auth/google', extractAuthTypeMiddleware, passport.authenticate('google'));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, _info, _status) => {

    console.log(err);
    console.log(user);
    console.log(_info);
    console.log(_status);

    if (!user || err) {
      let nquery = {
        auth_success: false,
        redirect: '/login',
      };
      res.redirect('/login?' + new URLSearchParams(nquery).toString());
      // res.sendFile(failureRidrect);
    }

    if (user) {
      res.sendFile(successRidrect);
    }

    next();
  })(req, res, next)
});

module.exports = router;
