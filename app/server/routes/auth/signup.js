const passport = require('passport');
const router = require('express').Router();

router.post('/auth/signup', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: 'Signup failed',
        data: err ?? info
      });
    }
    if (user) {
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
      });
    }

    next();
  })(req, res, next);
});

module.exports = router;