const passport = require('passport');

/**
 * Checks if the user has permission to perform this request
 * @param {Request} req
 * @param {Response} res
 * @param {CallableFunction} next
 */

const ownershipCheck = (req, res, next) => {
  passport.authenticate('jwt', (err, user, _info) => {
    if (err) return next(err);
    if ((user?.sub != req?.params?.id)) return res.status(403).json({
      success: false,
      message: "You are not allowed to make this request",
      data: null
    });
    next();
  })(req, res, next);
}

module.exports = ownershipCheck;