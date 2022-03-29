const asynHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Bid = require('./../models/bidModel');

/** bid fields **
 * 
 * id
 * bidder
 * auction
 * price
 */

// get bid - 
// Which parameters will be used to get the bids info ?
const getBid = asynHandler(async (req, res) => {
    Bid.findById(req.body.id, (err, doc) => {

        if (err) res.status(404).json({ message: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create bid
const setBid = asynHandler(async (req, res) => {
    const { id, userId, auctionId, bidPrice } = req.body;
    Bid.create({ userId, auctionId, bidPrice }, (error, doc) => {

        if (error) res.json({ message: `Error ${error.message}` });

        res.status(201).json({ message: `${doc.id} create successfuly` });
    });
});

// update bid
const updateBid = asynHandler(async (req, res) => {

});

// delete bid
const deleteBid = asynHandler(async (req, res) => {

});

module.exports = { getBid, setBid, updateBid, deleteBid }