const asyncHandler = require('express-async-handler');
const Auction = require('./../models/auctionModel');

// get Auction by id
const getAuction = asyncHandler(async (req, res) => {
    Auction.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create Auction
const setAuction = asyncHandler(async (req, res) => {
    const { start, end, user, space, initialPrice, status } = req.body;
    Auction.create({ start, end, user, space, initialPrice, status }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Auction ${doc.id} created` });
    });
});

//update  Auction
const updateAuction = asyncHandler(async (req, res) => {
    const body = req.body;
    Auction.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Auction ${doc._id} updated` });
    });
});

// delete Auction
const deleteAuction = asyncHandler(async (req, res) => {
    Auction.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status().json({ message: `Auction ${doc?.id} deleted` });
    });
});
module.exports = {
    getAuction,
    setAuction,
    updateAuction,
    deleteAuction
}
