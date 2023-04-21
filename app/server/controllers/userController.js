const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const Bid = require('../models/bidModel');
const Space = require('../models/spaceModel');
const Listing = require('../models/listingModel');
const Auction = require('../models/auctionModel');
const Profile = require('../models/profileModel');
const Account = require('../models/accountModel');

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

const getUserListingById = asyncHandler(async (req, res) => {
  Listing.findById({ _id: req?.params?.listingId }, (error, listing) => {
    if (error) return res.status(500).json({ success: false, message: `Error ${error.message}`, data: err });
    if (!listing) return res.status(404).json({ success: false, message: `No listing found`, data: error });
    res.json({ success: true, message: 'Listing found', data: listing });
  });
});

const updateUserListingById = asyncHandler(async (req, res) => {
  let { user, space, status } = req?.body;
  Listing.findByIdAndUpdate({ _id: req?.params?.listingId }, { user, space, status }, (error, listing) => {
    if (error) return res.status(500).json({ success: false, message: `Error ${error.message}`, data: err });
    if (!listing) return res.status(404).json({ success: false, message: `No listing found`, data: error });
    res.json({ success: true, message: 'Listing updated', data: listing });
  });
});

const deleteUserListingById = asyncHandler(async (req, res) => {
  Listing.findByIdAndDelete({ _id: req?.params?.listingId }, (error, listing) => {
    if (error) return res.status(500).json({ success: false, message: `Error ${error.message}`, data: err });
    if (!listing) return res.status(404).json({ success: false, message: `No listing found`, data: error });
    res.json({ success: true, message: 'Listing deleted', data: listing });
  });
});

const getUserSpaces = asyncHandler(async (req, res) => {
  Space.find({ user: req?.params?.id }, (error, spaces) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!spaces) return res.status(404).json({ success: false, message: `No spaces found`, data: error });
    res.json({ success: true, message: `Found ${spaces.length} spaces`, data: spaces });
  });
});

const getUserSpaceById = asyncHandler(async (req, res) => {
  Space.findById(req?.params?.spaceId, (error, space) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!space) return res.status(404).json({ success: false, message: `Could not find space`, data: null });
    res.json({ success: true, message: "Space found", data: space });
  });
});

const updateUserSpaceById = asyncHandler(async (req, res) => {
  let { type, user, location, dimension, address } = req.body;
  //TODO: handle the images update
  Space.findByIdAndUpdate(req?.params?.spaceId, { type, user, location, dimension, address }, (error, space) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!space) return res.status(404).json({ success: false, message: `Could not find space`, data: null });
    res.json({ success: true, message: "Space updated", data: space });
  });
});

const deleteUserSpaceById = asyncHandler(async (req, res) => {
  let { id: user, spaceId: _id } = req.params;
  Space.findOneAndDelete({ _id, user }, (error, space) => {
    if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!space) return res.status(404).json({ success: false, message: "space not found", data: null });
    res.json({ success: true, message: "space deleted", data: space });
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
  Promise.all([
    Listing.countDocuments({ user: req?.params?.id }).exec(),
    Auction.countDocuments({ user: req?.params?.id }).exec(),
    Bid.countDocuments({ bidder: req?.params?.id }).exec(),
    Space.countDocuments({ user: req?.params?.id }).exec()
  ])
    .then(([listingCount, auctionCount, bidCount, spaceCount]) => {
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
    })
    .catch(error => {
      return res.status(500).json({
        success: false,
        message: `Error: ${error?.message}`,
        data: error
      });
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

const getUserAccount = asyncHandler(async (req, res) => {
  Account.findOne({ user: req?.params?.id }, (error, account) => {
    if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!account) return res.status(404).json({ success: false, message: "Account not found", data: null });
    res.json({ success: true, message: "Account found", data: account });
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {

  // Get the type of email used to create the account
  User.findById({ _id: req?.params?.id }, { "signUpMethod": 1 }, (error, method) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error?.message}`, data: error });
    if (!method) return res.status(404).json({ success: false, message: `Signup method not found`, data: null });
    if (method != 'email') {
      return res.status(400).json({ success: false, message: 'Email address cannot be changed', data: null });
    }

    let id = req.params.id;
    let { name, email } = req.body;

    User.findOneAndUpdate({ _id: id }, { "name": name, "email": email }, { new: true }, (error, user) => {
      if (error) return res.status(500).json({ success: false, message: `Error: ${error?.message}`, data: error });
      if (!user) return res.status(404).json({ success: false, message: `Profile not update`, data: null });

      //TODO: handle profile photo change HERE

      res.json({ success: true, message: "Profile updated", data: user });
    });
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
  //TODO: use transaction to delete user
  const { id } = req.params;
  let session = User.db.startSession();
  try {
    (await session).startTransaction();

    await Account.deleteOne({ user: id }, { session });
    await Profile.deleteOne({ user: id }, { session });
    await User.findByIdAndDelete(id, { session });

    (await session).commitTransaction();
    (await session).endSession();

    res.status(200).json({ success: true, message: `User ${id} deleted.`, data: null });

  } catch (error) {
    (await session).abortTransaction();
    if (error) return res.status(400).json({ success: false, message: `${error.message}`, data: error });
  }

});

module.exports = {
  getUserById,
  getUserName,
  getUserMessages,
  getUserListings,
  getUserListingById,
  updateUserListingById,
  deleteUserListingById,
  getUserSpaces,
  getUserSpaceById,
  updateUserSpaceById,
  deleteUserSpaceById,
  getUserAuctions,
  getUserBids,
  setUser,
  getUserHistories,
  getUserProfile,
  updateUserProfile,
  getUserAccount,
  // updateUser, //TODO: implement password update
  deleteUserById
};