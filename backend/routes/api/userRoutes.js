const express = require('express');
const router = express.Router();
const { getUser, setUser, deleteUser } = require('../../controllers/userController');
const User = require('../../models/accountModel');

router.route("/").get(async (req, res) => { // todo - remove this route
    User.find({}, (err, doc) => {
        if (err) throw new Error("You've messed up");
        res.status(200).json(doc);

    });
}).post(setUser);

router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;