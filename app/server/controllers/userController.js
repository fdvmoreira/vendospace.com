const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const Bid = require('../models/bidModel');
const Space = require('../models/spaceModel');
const Listing = require('../models/listingModel');
const Auction = require('../models/auctionModel');
const Profile = require('../models/profileModel');

const getUserById = asyncHandler(async (req, res) => {
  User.findById(req?.params?.id, (error, user) => {
    if (error) return res.status(404).json({ success: false, message: `${error.message}`, data: error });
    if (!user) return res.status(404).json({ success: false, message: "User not found", data: null });
    res.status(200).json({ success: true, message: 'Found user', data: { ...user?._doc, passwordHash: "" } });
  });
});

const getUserName = asyncHandler(async (req, res) => {
  User.findOne({ _id: req?.params?.id }, { name: 1 }, (error, user) => {
    if (error) return res.status(400).json({ success: false, message: `Error ${error.message}`, data: err });
    if (error) return res.status(404).json({ success: false, message: "User not found", data: err });
    res.json({ success: true, message: "User found", data: user });
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

const getUserHistories = asyncHandler(async (req, res) => {
  let [listingCount, bidCount, spaceCount, auctionCount] = [0, 0, 0, 0];
  let errors = [];

  Auction.countDocuments({ _id: req?.params?.id }, (error, count) => {
    if (error) return errors.push(error);
    auctionCount = count;
  });

  Listing.countDocuments({ _id: req?.params?.id }, (error, count) => {
    if (error) return errors.push(error);
    listingCount = count;
  });

  Space.countDocuments({ _id: req?.params?.id }, (error, count) => {
    if (error) return errors.push(error);
    spaceCount = count;
  });

  Bid.countDocuments({ _id: req?.params?.id }, (error, count) => {
    if (error) return errors.push(error);
    bidCount = count;
  });

  if (errors.length > 0) return res.status(500).json({
    success: false,
    message: `Error: ${errors?.[0].message}`,
    data: errors
  });

  res.json({
    success: true,
    message: "Here are the history summary",
    data: {
      listings: { count: listingCount },
      auctions: { count: auctionCount },
      bids: { count: bidCount },
      spaces: { count: spaceCount }
    }
  });

});

const getUserProfile = asyncHandler(async (req, res) => {

  Profile.findOne({ user: req?.params?.id }, { "avatar": 1 }, (error, avatarUrl) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });

    User.findById({ _id: req?.params?.id }, { "name": 1, "email": 1 }, (error, user) => {
      if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
      res.json({
        success: true,
        message: "Profile found",
        data: {
          name: user?.name,
          email: user?.email,
          avatarUrl: avatarUrl?.avatar
        }
      });
    });
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  let signUpMethod = "";

  // Get the type of email used to create the account
  User.findOne({ _id: id }, { "signUpMethod": 1 }, (error, method) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error?.message}`, data: error });
    if (!method) return res.status(404).json({ success: false, message: `Signup method not found`, data: null });
    signUpMethod = method;
  });

  if (emailType != 'email') {
    return res.status(400).json({ success: false, message: 'Email address cannot be changed', data: null });
  }

  let id = req.params.id;
  let { name, email } = req.body;

  User.findOneAndUpdate({ _id: id }, { name, email }, (error, user) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error?.message}`, data: error });
    if (!user) return res.status(404).json({ success: false, message: `Profile not update`, data: null });

    //TODO: handle profile photo change HERE

    res.json({ success: true, message: "Profile updated", data: user });
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
  getUserName,
  getUserMessages,
  getUserListings,
  getUserSpaces,
  getUserAuctions,
  getUserBids,
  setUser,
  getUserHistories,
  getUserProfile,
  updateUserProfile,
  // updateUser, //TODO: implement password update
  deleteUserById
};