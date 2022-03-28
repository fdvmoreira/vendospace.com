const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getUser, setUser, deleteUser } = require('../../controllers/userController');
const User = require('../../models/accountModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    let doc = await User.find({});
    if (!doc) throw new Error("You've messed up");
    res.status(200).json(doc);

})).post(setUser);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;