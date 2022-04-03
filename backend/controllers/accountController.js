require('colors');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Account = require('../models/AccountModel');

// TODO - implement this controller with its data

// find a user by its _id
const getAccount = asyncHandler(async (req, res) => {
    Account.findById(req.params.id, (error, result) => {
        if (error) return res.status(400).json({ message: `${error}` });

        res.status(200).json(result);
    });
});

// create new account

const setAccount = asyncHandler(async (req, res) => {
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

    Account.create({
        name,
        email,
        passwordHash,
        signUpMethod
    }, (error, result) => {
        if (error) return res.status(400).json({ message: `${error.message}` });
        res.status(201).json({ message: " Account created successfuly", user: result });
    });
});

// delete Account
const deleteAccount = asyncHandler(async (req, res) => {
    const { id } = req.params;

    Account.findByIdAndDelete(id, (error, doc, result) => {
        if (error) return res.status(400).json({ message: `${error.message}`.red.bold.underline });

        if (!doc) return res.status(202).json({ message: `${id} not found.` });

        res.status(200).json({
            message: `Account ${doc?._id} removed.`, result: `${result}`
        });

    });
});

module.exports = {
    getAccount,
    setAccount,
    // updateAccount,
    deleteAccount
}