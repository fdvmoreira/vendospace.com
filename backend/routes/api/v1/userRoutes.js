const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getUser, setUser, deleteUser } = require('../../../controllers/userController');
const User = require('../../../models/accountModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    User.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setUser);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;