const passport = require('passport');
const router = require('express').Router();
const { extractAuthTypeMiddleware } = require('../../middlewares/lib/extractAuthTypeFromReqHeader');
const signJwtToken = require('../../utils/signJwtToken');
const AES = require('crypto-js/aes')

router.get('/auth/linkedin', extractAuthTypeMiddleware, passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, _info, _status) => {

    if (!user || err) {
      res.redirect('/login?' + new URLSearchParams({ auth_success: false }).toString());
    }

    if (user) {
      let token = signJwtToken(user);
      let params = new URLSearchParams({
        auth_success: true,
        data: AES.encrypt(JSON.stringify({
          user: { _id, name, email, signUpMethod } = user,
          token,
          isAuthenticated: true
        }), process.env.JWT_SECRET).toString()
      }).toString();

      res.redirect('/?' + params);
    }

    next();
  })(req, res, next)

});

module.exports = router;
