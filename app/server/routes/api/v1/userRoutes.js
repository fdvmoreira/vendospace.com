const express = require('express');
const asynHandler = require("express-async-handler");
const passport = require('passport');
const router = express.Router();
const { getUser, setUser, deleteUser } = require('../../../controllers/userController');
const auth = require('../../../middlewares/auth');
const User = require('../../../models/userModel');

passport.use(require("../../../middlewares/thirdPartyAuth/jwtStrategy"));

router.route("/").get(passport.authenticate('jwt', { session: false }), asynHandler(async (req, res) => { // todo - remove this route
    User.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setUser);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;