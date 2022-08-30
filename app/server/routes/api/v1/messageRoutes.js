const express = require('express');
const { body, validationResult } = require('express-validator');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getMessage, setMessage, deleteMessage } = require('../../../controllers/messageController');
const Message = require('../../../models/messageModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Message.find((err, doc) => {
        if (err) res.status(400).json({ success: false, message: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(
    body("from").trim().isMongoId(),
    body("to").trim().isMongoId(),
    body("subject").trim().notEmpty().isString().isLength({ max: 50 }).escape(),
    body("text").trim().notEmpty().isString().isLength({ max: 200 }).escape(),
    asynHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false, message: `${errors.array({ onlyFirstError: true })[0]}`,
            });
        }
        next();
    }),
    setMessage);

// TODO: Handle-remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getMessage).delete(deleteMessage);

module.exports = router;