const asyncHandler = require('express-async-handler');
const Listing = require('./../models/listingModel');

const getAllListings = asyncHandler(async (req, res) => {
  Listing.find({ "status": "active" }, (error, listings) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!listings.length > 0) return res.status(404).json({ success: false, message: 'Listings Not Found', data: null });
    res.json({ success: true, message: `Found ${listings.length} listings`, data: listings });
  });
});

const getAllListingsPublic = asyncHandler(async (req, res) => {
  Listing.find({ "status": "active" }, { "user": 0 }, (error, listings) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!listings.length > 0) return res.status(404).json({ success: false, message: 'Listings Not Found', data: null });
    res.json({ success: true, message: `Found ${listings.length} listings`, data: listings });
  });
});

const getListingById = asyncHandler(async (req, res) => {
  Listing.findById(req?.params?.id, (error, listing) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!listing) return res.status(404).json({ success: false, message: 'Listing Not Found', data: null });
    res.json({ success: true, message: 'Listing Found', data: listing });
  });
});

const setListing = asyncHandler(async (req, res) => {
  const { space, user, status } = req.body;
  Listing.create({ space, user, status }, (error, listing) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!listing) return res.status(404).json({ success: false, message: 'Listing Not created', data: null });
    res.status(201).json({ success: true, message: `Listing created`, data: listing });
  });
});

const updateListing = asyncHandler(async (req, res) => {
  const body = req.body;
  Listing.findByIdAndUpdate(req?.params?.id, { ...body }, (error, listing) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!listing) return res.status(404).json({ success: false, message: 'Listing Not created', data: null });
    res.json({ success: true, message: `Listing updated`, data: listing });
  });
});

const deleteListing = asyncHandler(async (req, res) => {
  Listing.findByIdAndDelete(req?.params?.id, (error, listing) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!listing) return res.status(404).json({ success: false, message: 'Listing Not deleted', data: null });
    res.json({ success: true, message: `Listing deleted`, data: listing });
  });
});
module.exports = {
  getAllListingsPublic,
  getAllListings,
  getListingById,
  setListing,
  updateListing,
  deleteListing
}
