const express = require('express');
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getAllActivePublicAuctions,
  getAuctionById,
  setAuction,
  updateAuctionById,
  deleteAuctionById,
} = require('../../../controllers/auctionController');
const Auction = require('../../../models/auctionModel');
const authenticationCheck = require('../../../middlewares/auth/authenticationCheck');
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');

router.route("/").get(asyncHandler(async (req, res) => { // todo - remove this route
  Auction.find((err, doc) => {
    if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
    res.status(200).json(doc);
  });

})).post(authenticationCheck, setAuction);

router.route('/:id')
  .get(authenticationCheck, getAuctionById)
  .patch(authenticationCheck, ownershipCheck, updateAuctionById)
  .delete(authenticationCheck, ownershipCheck, deleteAuctionById);

router
  .get('/public/:no', getAllActivePublicAuctions);

module.exports = router;