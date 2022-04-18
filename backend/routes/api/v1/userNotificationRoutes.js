const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getUserNotification, setUserNotification, deleteUserNotification } = require('../../../controllers/userNotificationController');
const UserNotification = require('../../../models/userNotificationModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    UserNotification.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setUserNotification);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getUserNotification).delete(deleteUserNotification);

module.exports = router;