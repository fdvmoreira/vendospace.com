require('colors');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/accountModel');

// find a user by its _id
const getUser = asyncHandler(async (req, res) => {
    User.findById(req.params.id, (error, doc) => {
        if (error) {
            res.status(404).json({ message: `${error.message}` });
        }
        res.status(200).json(doc);
    });
});

// create new user
const setUser = asyncHandler(async (req, res) => {
    let { name, email, password, 'signup-method': signUpMethod } = req.body;

    HASH_ROUND = 7;
    let passwordHash = "";

    if (signUpMethod == "Email") {
        // create password hash
        passwordHash = await bcrypt.hash(password, HASH_ROUND);
        if (!passwordHash) {
            res.status(400).json({ message: `${passwordHash}` });
        }
    }

    User.create({
        name,
        email,
        passwordHash,
        signUpMethod
    }, (error, doc) => {
        if (error) res.status(404).json({ message: `${error.message}` }); //throw new Error('Could not create user');

        res.status(201).json({ message: ` User created successfuly with id ${doc.id}` });
    });
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id, (error, doc) => {

        if (error) return res.status(400).json({ message: `${error.message}`.red.bold.underline });

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