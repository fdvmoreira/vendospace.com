const asyncHandler = require('express-async-handler');
const Bid = require('./../models/bidModel');

const getBid = asyncHandler(async (req, res) => {
  Bid.findById(req.params.id, (error, bid) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${err.message}`, data: error });
    if (!bid) return res.status(404).json({ success: false, message: 'Bid not found', data: null });
    res.status(200).json({ success: true, message: `found bids`, data: bid });
  });
});

const getBidsByAuctionId = asyncHandler(async (req, res) => {
  Bid.find({ auction: req?.params?.auctionId }, (error, bids) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${err.message}`, data: error });
    if (!bids) return res.status(404).json({ success: false, message: 'bids not found', data: null });
    res.status(200).json({ success: true, message: `found bids`, data: bids });
  });
});

const getBidsByAuctionIdPublic = asyncHandler(async (req, res) => {
  Bid.find({ auction: req?.params?.auctionId }, { bidder: 0 }, (error, bids) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${err.message}`, data: error });
    if (!bids) return res.status(404).json({ success: false, message: 'bids not found', data: null });
    res.status(200).json({ success: true, message: `found bids`, data: bids });
  });
});

const getStatsByAuctionId = asyncHandler(async (req, res) => {
  try {
    let bidsCount = await Bid.countDocuments({ "auction": req?.params?.auctionId }).exec();
    let highestBid = await Bid.find({ "auction": req?.params?.auctionId }).select("price").sort({ price: -1 }).limit(1).exec();

    res.json({
      success: true, message: 'found stats', data: {
        bidsCount, highestBid: highestBid?.[0]?.price ?? 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error: ${error?.message}`, data: error });
  }
});

const setBid = asyncHandler(async (req, res) => {
  const body = req?.body;
  Bid.create({ ...body }, (error, bid) => {
    if (error) return res.json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!bid) return res.status(404).json({ success: false, message: 'Bid not created', data: null });
    res.status(201).json({ success: true, message: `bid created`, data: bid });
  });
});

const updateBidById = asyncHandler(async (req, res) => {
  const body = req?.body;
  Auction.findByIdAndUpdate(req.params.id, { body }, (error, bid) => {
    if (error) return res.status(400).json({ success: false, Error: `${error.message}`, data: error });
    if (!bid) return res.status(404).json({ success: false, message: 'Bid not found', data: null });
    res.status(201).json({ success: true, message: `Bid ${bid._id} updated`, data: bid });
  });
});

const deleteBidById = asyncHandler(async (req, res) => {
  Bid.findByIdAndDelete(req.body.id, (error, bid) => {
    if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}` });
    if (!bid) return res.status(404).json({ success: false, message: 'Bid not found', data: null });
    res.status(200).json({ success: true, message: `${bid.id} deleted successfully` });
  });
});

module.exports = {
  getBid,
  getStatsByAuctionId,
  getBidsByAuctionId,
  getBidsByAuctionIdPublic,
  setBid,
  updateBidById,
  deleteBidById
}
