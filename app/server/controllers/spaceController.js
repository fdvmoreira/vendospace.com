const asyncHandler = require('express-async-handler')
const Space = require('../models/spaceModel')

// find space by ID
const getSpace = asyncHandler(async (req, res) => {
    Space.findById(req.params.id, (err, doc) => {
        if (err) res.status().json({ message: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create space
const setSpace = asyncHandler(async (req, res) => {
    const { type, location, dimension, imagesURL, address } = req.body;

    Space.create({ type, location, dimension, imagesURL, address }, (err, doc) => {
        if (err) res.status(400).json({ message: `${err.message}` });

        res.status(201).json({ message: `Ad-Space created with ID: ${doc._id}`, id: doc._id });
    });
});

// update ad-space
const updateSpace = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const { doc } = req.body; // TODO - field to update

    Space.findByIdAndUpdate(id, { doc }, (err, doc) => {
        if (err) res.status(400).json({ message: `${err.message}` });

        res.status(200).json({ message: `Ad-Space ${doc} updated` });
    });
});

// delete ad-space
// private - only admin can delete
const deleteSpace = asyncHandler(async (req, res) => {
    const { id } = req.body;

    Space.findByIdAndDelete(id, (err, doc) => {
        if (err) res.status(400).json({ message: `${err.message}` });

        res.status(200).json({ message: `Ad-Space deleted` });
    });
});

module.exports = { getSpace, setSpace, updateSpace, deleteSpace }