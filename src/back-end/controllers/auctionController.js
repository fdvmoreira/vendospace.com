const asyncHandler = require('express-async-handler');
const Auction = require('./../models/auctionModel');

const getAllActiveAuctions = asyncHandler(async (req, res) => {
  Auction.find({ status: "open" }, (error, auctions) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!auctions) return res.status(404).json({ success: false, message: 'Auction not found', data: null });
    res.json({ success: true, message: `Found ${auctions?.length ?? 0} auctions`, data: auctions });
  });
});

const getAllActivePublicAuctions = asyncHandler(async (req, res) => {
  Auction.find({ status: "open" }, { user: 0 }, (error, auction) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!auction) return res.status(404).json({ success: false, message: 'Auction not found', data: null });
    res.json({ success: true, message: `Auction found`, data: auction });
  });
});

const getAuctionById = asyncHandler(async (req, res) => {
  Auction.findById(req.params.id, (error, auction) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!auction) return res.status(404).json({ success: false, message: 'Auction not found', data: null });
    res.json({ success: true, message: `Auction found`, data: auction });
  });
});

const setAuction = asyncHandler(async (req, res) => {
  const { start, end, user, space, initialPrice, status } = req.body;
  Auction.create({ start, end, user, space, initialPrice, status }, (error, auction) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!auction) return res.status(404).json({ success: false, message: 'Auction not created', data: null });
    res.status(201).json({ success: true, message: `Auction created`, data: auction });
  });
});

const updateAuctionById = asyncHandler(async (req, res) => {
  const body = req.body;
  Auction.findByIdAndUpdate(req.params.id, { ...body }, { new: true }, (error, auction) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!auction) return res.status(404).json({ success: false, message: 'Auction not found', data: null });
    res.json({ success: true, message: `Auction  updated`, data: auction });
  });
});

const deleteAuctionById = asyncHandler(async (req, res) => {
  Auction.findByIdAndDelete(req.params.id, (error, auction) => {
    if (error) return res.status(500).json({ success: false, message: `Error: ${error.message}`, data: error });
    if (!auction) return res.status(404).json({ success: false, message: 'Auction not deleted', data: null });
    res.json({ success: true, message: 'Auction deleted', data: auction });
  });
});

module.exports = {
  getAllActiveAuctions,
  getAllActivePublicAuctions,
  getAuctionById,
  setAuction,
  updateAuctionById,
  deleteAuctionById
}
