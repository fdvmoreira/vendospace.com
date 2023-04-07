require('colors');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// find a user by its _id
const getUser = asyncHandler(async (req, res) => {
  User.findById(req.params.id, (error, doc) => {
    if (error) {
      res.status(404).json({ error: `${error.message}` });
    }
    res.status(200).json(doc);
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
    if (error) res.status(404).json({ error: `${error.message}` }); //throw new Error('Could not create user');

    res.status(201).json({ message: ` User id ${doc.id} created` });
  });
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id, (error, doc) => {

    if (error) return res.status(400).json({ error: `${error.message}` });

    if (!doc) return res.status(404).json({ message: `${id} not found.` });

    res.status(200).json({
      message: `User ${doc?._id} removed.`, doc: `${1 + 1}`
    });
  });
});

module.exports = {
  getUser,
  setUser,
  // updateUser,
  deleteUser
};