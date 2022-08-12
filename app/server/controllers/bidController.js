const asynHandler = require('express-async-handler');
const Bid = require('./../models/bidModel');

// get bid - 
// Which parameters will be used to get the bids info ?
const getBid = asynHandler(async (req, res) => {
    Bid.findById(req.params.id, (err, doc) => {

        if (err) return res.status(404).json({ success: false, message: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create bid
const setBid = asynHandler(async (req, res) => {
    const { bidder, auction, price } = req.body;
    Bid.create({
        bidder,
        auction,
        price
    }, (error, doc) => {

        if (error) return res.json({ success: false, message: `Error ${error.message}` });

        res.status(201).json({ success: true, message: `${doc.id} created` });
    });
});

// update bid
const updateBid = asynHandler(async (req, res) => {
    const body = req.body;
    Auction.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) return res.status(400).json({ success: false, Error: `${err.message}` });

        res.status(201).json({ success: true, message: `Bid ${doc._id} updated` });
    });
});

// delete bid
const deleteBid = asynHandler(async (req, res) => {
    Bid.findByIdAndDelete(req.body.id, (error, doc) => {

        if (error) return res.status(400).json({ success: false, message: `Error: ${error.message}` });

        res.status(200).json({ success: true, message: `${doc.id} deleted successfuly` });
    });
});

module.exports = { getBid, setBid, updateBid, deleteBid }
