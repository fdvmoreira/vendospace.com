const asyncHandler = require('express-async-handler');
const Account = require('../models/accountModel');

const getAccount = asyncHandler(async (req, res) => {
  Account.findById(req?.params?.id, (error, account) => {
    if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!account) return res.status(404).json({ success: false, message: "Account not found", data: null });
    res.json({ success: true, message: "Account found", data: account });
  });
});

const setAccount = asyncHandler(async (req, res) => {
  let { user, type, status } = req.body;
  Account.create({ user, type, status }, (error, account) => {
    if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: error });
    res.status(201).json({ success: true, message: " Account created", data: account });
  });
});

const updateAccount = asyncHandler(async (req, res) => {
  let { type } = req.body;
  Account.findByIdAndUpdate(req?.params?.id, { type }, (error, account) => {
    if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!account) return res.status(400).json({ success: true, message: "User not found", data: null });
    res.json({ success: true, message: "Account updated", data: account });
  });
});

const deleteAccount = asyncHandler(async (req, res) => {
  Account.findByIdAndDelete(req?.params?.id, (error, account) => {
    if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!account) return res.status(404).json({ success: false, message: `${id} not found.`, data: null });
    res.status(200).json({ success: true, message: `Account ${account?._id} removed.`, data: null });
  });
});

module.exports = {
  getAccount,
  setAccount,
  updateAccount,
  deleteAccount
}