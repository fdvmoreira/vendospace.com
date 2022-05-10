const asyncHandler = require('express-async-handler');
const { Notification } = require('./../models/notificationModel');

// get Notification by id
const getNotification = asyncHandler(async (req, res) => {
    Notification.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create Notification
const setNotification = asyncHandler(async (req, res) => {
    const { text } = req.body;
    Notification.create({ text }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Notification ${doc.id} created` });
    });
});

//update  Notification
const updateNotification = asyncHandler(async (req, res) => {
    const body = req.body;
    Notification.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Notification ${doc._id} updated` });
    });
});

// delete Notification
const deleteNotification = asyncHandler(async (req, res) => {
    Notification.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status().json({ message: `Notification ${doc?.id} deleted` });
    });
});
module.exports = {
    getNotification,
    setNotification,
    updateNotification,
    deleteNotification
}
