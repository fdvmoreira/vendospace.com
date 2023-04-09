const router = require('express').Router();
const passport = require('passport');

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
      return res.status(200).json({
        success: true,
        message: "Authentication successful",
        data: user
      });
    }
    next();
  })(req, res, next);
});

module.exports = router;