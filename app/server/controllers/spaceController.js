const asyncHandler = require('express-async-handler')
const Space = require('../models/spaceModel')

// find space by ID
const getSpace = asyncHandler(async (req, res) => {
  Space.findById(req.params.id, (err, space) => {
    if (err) return res.status().json({ success: false, message: `${err.message}`, data: err });
    if (!space) return res.status(404).json({ success: false, message: `${err.message}`, data: err });
    res.status(200).json({ success: true, message: "Found space", data: space });
  });
});

// create space
const setSpace = asyncHandler(async (req, res) => {
  const { type, user, location, dimension, imagesURL, address } = req.body;

  Space.create({ type, location, dimension, imagesURL, address }, (err, space) => {
    if (err) return res.status(400).json({ success: false, message: `${err.message}`, data: err });
    res.status(201).json({ success: true, message: "Ad Space created", data: space });
  });
});

// update ad-space
const updateSpace = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const space = req.body; // TODO - field to update

  Space.findByIdAndUpdate(id, { space }, (err, space) => {
    if (err) return res.status(400).json({ success: false, message: `${err.message}` });
    if (!space) return res.status(404).json({ success: false, message: "Space not found", data: null });
    res.json({ success: true, message: `Ad Space ${space} updated`, data: space });
  });
});

// delete ad-space
// private - only admin can delete
const deleteSpace = asyncHandler(async (req, res) => {
  const { id } = req.body;

  Space.findByIdAndDelete(id, (err, space) => {
    if (err) return res.status(400).json({ success: false, message: `${err.message}`, data: err });
    if (!space) return res.status(404).json({ success: false, message: "Space not found", data: null });
    res.json({ success: true, message: `Ad Space deleted`, data: space });
  });
});

module.exports = { getSpace, setSpace, updateSpace, deleteSpace }
