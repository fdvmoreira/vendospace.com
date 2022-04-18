const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getMessage, setMessage, deleteMessage } = require('../../../controllers/messageController');
const Message = require('../../../models/messageModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Message.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setMessage);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getMessage).delete(deleteMessage);

module.exports = router;