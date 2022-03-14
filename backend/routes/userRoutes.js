const express = require('express');
const router = express.Router();
const { getUser, setUser } = require('./../controllers/userController');
const User = require('./../models/userModel');

router.route("/").get(async (req, res) => {
    let result = await User.find();
    res.status(200).json(result);
}).post(setUser);

router.route('/:id').get(getUser).put().delete();


module.exports = router;