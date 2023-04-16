const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// find a user by its _id
const getUserById = asyncHandler(async (req, res) => {
  User.findById(req.params.id, (error, doc) => {
    if (error) res.status(404).json({ error: `${error.message}` });
    res.status(200).json({ success: true, message: 'Found user', data: { ...doc._doc, passwordHash: "" } });
  });
});

// create new user
const setUser = asyncHandler(async (req, res) => {
  let { name, email, password: passwordHash, 'signup-method': signUpMethod } = req.body;

  User.create({
    name,
    email,
    passwordHash,
    signUpMethod
  }, (error, doc) => {
    if (error) res.status(404).json({ success: false, message: `${error.message}`, data: err });
    res.status(201).json({ success: true, message: ` User id ${doc.id} created`, data: { ...doc._doc, passwordHash: "" } });
  });
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id, (error, doc) => {
    if (error) return res.status(400).json({ success: false, message: `${error.message}`, data: err });
    if (!doc) return res.status(404).json({ success: false, message: `${id} not found.`, data: null });
    res.status(200).json({ success: true, message: `User ${doc?._id} removed.`, data: { ...doc._doc, passwordHash: "" } });
  });
});

module.exports = {
  getUserById,
  setUser,
  // updateUser, //TODO: implement password update
  deleteUser
};