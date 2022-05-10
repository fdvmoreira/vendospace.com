const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getAuction, setAuction, deleteAuction } = require('../../../controllers/auctionController');
const Auction = require('../../../models/auctionModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Auction.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setAuction);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getAuction).delete(deleteAuction);

module.exports = router;