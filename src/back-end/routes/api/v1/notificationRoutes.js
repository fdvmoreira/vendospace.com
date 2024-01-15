const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getNotification, setNotification, deleteNotification } = require('../../../controllers/notificationController');
const Notification = require('../../../models/notificationModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Notification.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setNotification);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getNotification).delete(deleteNotification);

module.exports = router;