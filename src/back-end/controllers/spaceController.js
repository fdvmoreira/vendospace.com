const asyncHandler = require('express-async-handler')
const Space = require('../models/spaceModel')

// find space by ID
const getSpaceById = asyncHandler(async (req, res) => {
  Space.findById(req?.params?.id, (error, space) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!space) return res.status(404).json({ success: false, message: 'No space found', data: null });
    res.status(200).json({ success: true, message: "Found space", data: space });
  });
});

const getSpaceByIdPublic = asyncHandler(async (req, res) => {
  Space.findById(req?.params?.id, { "user": 0 }, (error, space) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error?.message}`, data: error });
    if (!space) return res.status(404).json({ success: false, message: 'No space found', data: null });
    res.status(200).json({ success: true, message: "Found space", data: space });
  });
});

// create space
const setSpace = asyncHandler(async (req, res) => {
  const { type, user, location, dimension, imagesURL, address } = req.body;

  Space.create({ type, user, location, dimension, imagesURL, address }, (err, space) => {
    if (err) return res.status(400).json({ success: false, message: `${err.message}`, data: err });
    if (!space) return res.status(404).json({ success: false, message: `No space created`, data: null });
    res.status(201).json({ success: true, message: "Ad Space created", data: space });
  });
});

// update ad space
const updateSpaceById = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { space } = req.body; // TODO - field to update

  Space.findByIdAndUpdate(id, { ...space }, (error, space) => {
    if (error) return res.status(400).json({ success: false, message: `${error.message}`, data: error });
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

module.exports = {
  getSpaceById,
  getSpaceByIdPublic,
  setSpace,
  updateSpaceById,
  deleteSpace
}
