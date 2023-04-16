const passport = require('passport');

/**
 * Checks if the user has permission to perform this request
 * @param {Request} req
 * @param {Response} res
 * @param {CallableFunction} next
 */

const authenticationCheck = (req, res, next) => {
  passport.authenticate('jwt', (err, user, _info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({
      success: false,
      message: "Please authentication",
      data: null
    });
    next();
  })(req, res, next);
}

module.exports = authenticationCheck;