const express = require('express');
const router = express.Router();
const { getUser, setUser, deleteUser } = require('../../controllers/userController');
const User = require('../../models/accountModel');

router.route("/").get(async (req, res) => {
    let result = await User.find();
    res.status(200).json(result);
}).post(setUser);

router.route('/:id').get(getUser).put().delete(deleteUser);


module.exports = router;