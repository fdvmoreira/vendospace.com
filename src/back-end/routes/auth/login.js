const router = require('express').Router();
const passport = require('passport');
const signJwtToken = require('../../utils/signJwtToken');

router.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(403).json({
        success: false,
        message: 'Authentication failed',
        data: err ?? info
      });
    }
    if (user) {
      let token = signJwtToken(user);

      return res.status(200).json({
        success: true,
        message: "Authentication successful",
        data: user,
        token: token
      });
    }
    next();
  })(req, res, next);
});

module.exports = router;