const asyncHandler = require('express-async-handler');
const Profile = require('./../models/profileModel');

// get Profile by id
const getProfile = asyncHandler(async (req, res) => {
    Profile.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create Profile
const setProfile = asyncHandler(async (req, res) => {
    const { user, avatar } = req.body;
    Profile.create({ user, avatar }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Profile ${doc.id} created` });
    });
});

//update  Profile
const updateProfile = asyncHandler(async (req, res) => {
    const body = req.body;
    Profile.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Profile ${doc._id} updated` });
    });
});

// delete Profile
const deleteProfile = asyncHandler(async (req, res) => {
    Profile.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status().json({ message: `Profile ${doc?.id} deleted` });
    });
});
module.exports = {
    getProfile,
    setProfile,
    updateProfile,
    deleteProfile
}
