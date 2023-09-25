const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const {
  getMessage,
  setMessage,
  deleteMessage
} = require('../../../controllers/messageController');
const Message = require('../../../models/messageModel');
const passport = require('passport');
const authenticationCheck = require('../../../middlewares/auth/authenticationCheck');
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');

router.route("/").get(asyncHandler(async (req, res) => { // todo - remove this route
  Message.find((err, docs) => {
    if (err) return res.status(400).json({ success: false, message: `You've messed up: ${err.message}` });
    res.status(200).json({ success: true, message: `Found ${docs?.length} messages`, data: docs });
  });

})).post(
  authenticationCheck,
  body("from").trim().isMongoId(),
  body("to").trim().isMongoId(),
  body("subject").trim().notEmpty().isString().isLength({ max: 50 }).escape(),
  body("text").trim().notEmpty().isString().isLength({ max: 200 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false, message: `${errors.array({ onlyFirstError: true })[0]}`,
        data: errors
      });
    }
    next();
  }),
  setMessage);

router.route('/:id')
  .get(authenticationCheck, ownershipCheck, getMessage)
  .delete(authenticationCheck, ownershipCheck, deleteMessage);

module.exports = router;