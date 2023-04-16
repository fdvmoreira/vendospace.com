const express = require('express');
const asyncHandler = require("express-async-handler");
const passport = require('passport');
const router = express.Router();
const { getUserById, setUser, deleteUser } = require('../../../controllers/userController');
const User = require('../../../models/userModel');

passport.use(require("../../../authStrategies/jwtStrategy"));

router.route("/").get(passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => { // TODO - remove this route to prevent users from accessing others info
  User.find((err, doc) => {
    if (err) return res.status(400).json({ success: false, message: `You've messed up: ${err.message}`, data: err });
    let users = doc.map((user) => { return { ...user._doc, passwordHash: "" } });
    res.status(200).json(users);
  });

})).post(setUser);

// TODO -remove delete route because the database must keep history
router.route('/:id').get((req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return res.status(400).json({ success: false, message: err.message, data: err });
    if (req.params.id != user.sub) return res.status(403).json({
      success: false, message: "Unauthorized", data: new Error("Unauthorized User")
    });
    next();
  })(req, res, next)
}, getUserById)
  .delete(deleteUser);

module.exports = router;