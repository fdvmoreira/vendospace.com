const asyncHandler = require("express-async-handler");
const passport = require('passport');
const router = require('express').Router();
const {
  getUserById,
  getUserName,
  getUserMessages,
  getUserListings,
  getUserSpaces,
  getUserAuctions,
  getUserBids,
  setUser,
  getUserHistories,
  getUserProfile,
  updateUserProfile,
  deleteUserById
} = require('../../../controllers/userController');
const User = require('../../../models/userModel');
const authenticationCheck = require("../../../middlewares/auth/authenticationCheck");
const ownershipCheck = require("../../../middlewares/auth/ownershipCheck");

passport.use(require("../../../authStrategies/jwtStrategy"));

router.route("/").get(passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => { // TODO - remove this route to prevent users from accessing others info
  User.find((err, users) => {
    if (err) return res.status(400).json({ success: false, message: `You've messed up: ${err.message}`, data: err });
    users = users.map((user) => { return { ...users?._doc, passwordHash: "" } });
    res.json({ success: true, message: `Found ${users.length} users`, data: users });
  });

})).post(setUser);


router.route('/:id').get((req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return res.status(400).json({ success: false, message: err.message, data: err });
    if (req.params.id != user.sub) return res.status(403).json({
      success: false, message: "Unauthorized", data: new Error("Unauthorized User")
    });
    next();
  })(req, res, next)
}, getUserById)
  .delete(deleteUserById);// TODO -remove delete route because the database must keep history

/** common requests by authenticated users */
router.get('/:id/messages', authenticationCheck, getUserMessages)
  .get('/:id/listings', authenticationCheck, ownershipCheck, getUserListings)
  .get('/:id/spaces', authenticationCheck, ownershipCheck, getUserSpaces)
  .get('/:id/auctions', authenticationCheck, ownershipCheck, getUserAuctions)
  .get('/:id/bids', authenticationCheck, ownershipCheck, getUserBids)
  .get('/:id/name', authenticationCheck, getUserName)
  .get('/:id/history', authenticationCheck, ownershipCheck, getUserHistories)
  .get('/:id/profile', authenticationCheck, ownershipCheck, getUserProfile)
  .post('/:id/profile', authenticationCheck, ownershipCheck, updateUserProfile);

module.exports = router;