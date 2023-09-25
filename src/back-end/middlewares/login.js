// get email and password
// check if this email is in database
// if so, get the password hash
// compare the provided password and the password hash
// create auth token
// send it to client.

const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) res.status(400).json({ error: "you are doing it wrong." });

    User.findOne({ email }, (err, user) => {
        if (err) res.status(404).json({ error: `${err.message}` });
        if (!user) {
            res.json({ error: "Oops, Nothing for you here!" });
            return;
        }

        bcrypt.compare(password, user.passwordHash, (err, same) => {
            if (err) res.status(500).json({ error: `${err.message}` });
            if (!same) {
                res.status(500).json({ message: `You are doing it wrong!` });
                return;
            }

            jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 }, (err, encoded) => {
                res.json(encoded);
            });

        });
    });
});


module.exports = login;