const asyncHandler = require('express-async-handler');
const Message = require('./../models/messageModel');

// get Message by id
const getMessage = asyncHandler(async (req, res) => {
  Message.findById(req.params.id, (err, message) => {
    if (err) return res.status(500).json({ success: false, message: `Error: ${err.message}`, data: err });
    if (!message) return res.status(404).json({ success: false, message: "Message not found", data: null });
    res.json({ success: true, messages: "Message found", data: message });
  });
});

// create Message
const setMessage = asyncHandler(async (req, res) => {
  const { from, to, subject, text } = req.body;
  Message.create({ from, to, subject, text }, (error, message) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!message) res.status(404).json({ success: false, message: 'Message not created', data: message });
    res.status(201).json({ success: true, message: `Message created`, data: message });
  });
});

//update  Message
//TODO: remove this because we cannot update sent Messages
const updateMessage = asyncHandler(async (req, res) => {
  const body = req.body;
  Message.findByIdAndUpdate(req.params.id, { body }, (err, message) => {
    if (err) return res.status(500).json({ success: false, message: `${err.message}`, data: err });
    if (!message) res.status(404).json({ success: false, message: 'Message not found', data: message });
    res.status(201).json({ success: true, message: `Message updated`, data: message });
  });
});

// delete Message
const deleteMessage = asyncHandler(async (req, res) => {
  Message.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) return res.status(500).json({ success: false, message: `Error: ${err.message}`, data: err });
    if (!message) res.status(404).json({ success: false, message: 'Message not found', data: message });
    res.status(200).json({ success: true, message: `Message deleted`, data: message });
  });
});

module.exports = {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage
}
