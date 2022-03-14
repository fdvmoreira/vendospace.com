const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('./../models/userModel');

// find a user by its _id
const getUser = asyncHandler(async (req, res) => {
    User.findById(req.params.id, (error, result) => {
        if (error) return res.status(400).json({ message: `${error}` });

        res.status(200).json(result);
    });
});

// create new user
const setUser = asyncHandler(async (req, res) => {
    let { name, email, password, 'signup-method': signUpMethod } = req.body;

    HASH_ROUND = 7;
    let passwordHash = "";

    if (signUpMethod == "Email") {
        // create password hash
        const passwordHash = await bcrypt.hash(password, HASH_ROUND);
        if (!passwordHash) {
            res.status(400).json({ message: `${err.message}` });
        }
    }

    User.create({
        name,
        email,
        passwordHash,
        signUpMethod
    }, (error, result) => {
        if (error) return res.status(400).json({ message: `${error.message}` });
        res.status(201).json({ message: " User created successfuly", user: result });
    });
});

module.exports = {
    getUser,
    setUser,
    // updateUser,
    // deleteUser
};