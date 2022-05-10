const asyncHandler = require('express-async-handler');
const { UserNotification } = require('./../models/userNotificationModel');

// get UserNotification by id
const getUserNotification = asyncHandler(async (req, res) => {
    UserNotification.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create UserNotification
const setUserNotification = asyncHandler(async (req, res) => {
    const { user, notification } = req.body;
    UserNotification.create({ user, notification }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `User-Notification ${doc.id} created` });
    });
});

//update  UserNotification
const updateUserNotification = asyncHandler(async (req, res) => {
    const body = req.body;
    UserNotification.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `User-Notification ${doc._id} updated` });
    });
});

// delete UserNotification
const deleteUserNotification = asyncHandler(async (req, res) => {
    UserNotification.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status().json({ message: `UserNotification ${doc?.id} deleted` });
    });
});
module.exports = {
    getUserNotification,
    setUserNotification,
    updateUserNotification,
    deleteUserNotification
}
