const asyncHandler = require('express-async-handler');
const Message = require('./../models/messageModel');

// get Message by id
const getMessage = asyncHandler(async (req, res) => {
    Message.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ success: false, message: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create Message
const setMessage = asyncHandler(async (req, res) => {
    const { from, to, subject, text } = req.body;
    Message.create({ from, to, subject, text }, (err, doc) => {
        if (err) res.status(400).json({ success: false, message: `${err.message}` });

        res.status(201).json({ success: true, message: `Message ${doc.id} created` });
    });
});

//update  Message
const updateMessage = asyncHandler(async (req, res) => {
    const body = req.body;
    Message.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ success: false, message: `${err.message}` });

        res.status(201).json({ success: true, message: `Message ${doc._id} updated` });
    });
});

// delete Message
const deleteMessage = asyncHandler(async (req, res) => {
    Message.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ success: false, message: `${err.message}` });

        res.status(200).json({ success: true, message: `Message ${doc?.id} deleted` });
    });
});
module.exports = {
    getMessage,
    setMessage,
    updateMessage,
    deleteMessage
}
