const asynHandler = require('express-async-handler');
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
    Bid.findById(req.params.id, (err, doc) => {

        if (err) res.status(404).json({ message: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create bid
const setBid = asynHandler(async (req, res) => {
    const { userId, auctionId, bidPrice } = req.body;

    Bid.create({
        bidder: userId,
        auction: auctionId,
        price: bidPrice
    }, (error, doc) => {

        if (error) res.json({ message: `Error ${error.message}` });

        res.status(201).json({ message: `${doc.id} created` });
    });
});

// update bid
const updateBid = asynHandler(async (req, res) => {
    const body = req.body;
    Auction.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Bid ${doc._id} updated` });
    });
});

// delete bid
const deleteBid = asynHandler(async (req, res) => {
    Bid.findByIdAndDelete(req.body.id, (error, doc) => {

        if (error) res.status(400).json({ message: `Error: ${error.message}` });

        res.status(200).json({ message: `${doc.id} deleted successfuly` });
    });
});

module.exports = { getBid, setBid, updateBid, deleteBid }