const asyncHandler = require('express-async-handler');
const User = require('./../models/userModel');

// find a user by its _id
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id, (error, result) => {
        if (error) return res.status(404).json({ message: `${error}` });

        res.status(200).json(result);
    });
});



module.exports = {
    getUser,
    // setUser,
    // updateUser,
    // deleteUser
};