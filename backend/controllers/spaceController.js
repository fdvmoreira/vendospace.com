const asyncHandler = require('express-async-handler')
const { Space } = require('./../models/spaceModel')

// find space by ID
const getSpace = asyncHandler(async (req, res) => {
    const { id } = req.body;

    Space.findById(id, (err, doc) => {
        if (err) res.status().json({ message: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create space

module.exports = { getSpace }