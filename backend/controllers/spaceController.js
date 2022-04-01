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
const setSpace = asyncHandler(async (req, res) => {
    const { type, location, dimension, imagesURL, address } = req.body;

    Space.create({}, (err, doc) => {
        if (err) res.status(400).json({ message: `${err.message}` });

        res.status(201).json({ message: `Ad-Space created successfully: ${doc._id}` });
    });
});

// update ad-space


module.exports = { getSpace, setSpace }