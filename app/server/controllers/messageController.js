const asyncHandler = require('express-async-handler');
const { Message } = require('./../models/messageModel');

// get Message by id
const getMessage = asyncHandler(async (req, res) => {
    Message.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create Message
const setMessage = asyncHandler(async (req, res) => {
    const { sender, receiver, text } = req.body;
    Message.create({ sender, receiver, text }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Message ${doc.id} created` });
    });
});

//update  Message
const updateMessage = asyncHandler(async (req, res) => {
    const body = req.body;
    Message.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Message ${doc._id} updated` });
    });
});

// delete Message
const deleteMessage = asyncHandler(async (req, res) => {
    Message.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status().json({ message: `Message ${doc?.id} deleted` });
    });
});
module.exports = {
    getMessage,
    setMessage,
    updateMessage,
    deleteMessage
}
