const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const Bid = require('../models/bidModel');
const Space = require('../models/spaceModel');
const Listing = require('../models/listingModel');
const Auction = require('../models/auctionModel');

const getUserById = asyncHandler(async (req, res) => {
  User.findById(req?.params?.id, (error, user) => {
    if (error) return res.status(404).json({ success: false, message: `${error.message}`, data: error });
    if (!user) return res.status(404).json({ success: false, message: "User not found", data: null });
    res.status(200).json({ success: true, message: 'Found user', data: { ...user?._doc, passwordHash: "" } });
  });
});

const getUserMessages = asyncHandler(async (req, res) => {
  Message.find({ to: req?.params?.id }, (error, messages) => {
    if (error) return res.status(404).json({ success: false, message: `Error: ${error.message}`, data: error });
    res.json({ success: true, message: `Found ${messages.length} messages`, data: messages });
  });
});

const getUserListings = asyncHandler(async (req, res) => {
  Listing.find({ user: req?.params?.id }, (error, listings) => {
    if (error) return res.status(404).json({ success: false, message: `Error: ${error.message}`, data: error });
    res.json({ success: true, message: `Found ${listings.length} listings`, data: listings });
  });
});

const getUserSpaces = asyncHandler(async (req, res) => {
  Space.find({ user: req?.params?.id }, (error, spaces) => {
    if (error) return res.status(404).json({ success: false, message: `Error: ${error.message}`, data: error });
    res.json({ success: true, message: `Found ${spaces.length} spaces`, data: spaces });
  });
});

const getUserAuctions = asyncHandler(async (req, res) => {
  Auction.find({ user: req?.params?.id }, (error, auctions) => {
    if (error) return res.status(404).json({ success: false, message: `Error: ${error.message}`, data: error });
    res.json({ success: true, message: `Found ${auctions.length} auctions`, data: auctions });
  });
});

const getUserBids = asyncHandler(async (req, res) => {
  Bid.find({ bidder: req?.params?.id }, (error, bids) => {
    if (error) return res.status(404).json({ success: false, message: `Error: ${error.message}`, data: error });
    res.json({ success: true, message: `Found ${bids.length} bids`, data: bids });
  });
});

const setUser = asyncHandler(async (req, res) => {
  let { name, email, password: passwordHash, 'signup-method': signUpMethod } = req.body;

  User.create({
    name,
    email,
    passwordHash,
    signUpMethod
  }, (error, user) => {
    if (error) res.status(404).json({ success: false, message: `${error.message}`, data: err });
    res.status(201).json({ success: true, message: ` User id ${user?.id} created`, data: { ...user?._doc, passwordHash: "" } });
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //TODO: delete profile and accounts as well
  User.findByIdAndDelete(id, (error, user) => {
    if (error) return res.status(400).json({ success: false, message: `${error.message}`, data: err });
    if (!doc) return res.status(404).json({ success: false, message: `User ${id} not found.`, data: null });
    res.status(200).json({ success: true, message: `User ${user?._id} deleted.`, data: { ...user._doc, passwordHash: "" } });
  });
});

module.exports = {
  getUserById,
  getUserMessages,
  getUserListings,
  getUserSpaces,
  getUserAuctions,
  getUserBids,
  setUser,
  // updateUser, //TODO: implement password update
  deleteUserById
};