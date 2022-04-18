const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getProfile, setProfile, deleteProfile } = require('../../../controllers/profileController');
const Profile = require('../../../models/profileModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Profile.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setProfile);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getProfile).delete(deleteProfile);

module.exports = router;