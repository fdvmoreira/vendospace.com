const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getListing, setListing, deleteListing } = require('../../../controllers/listingController');
const Listing = require('../../../models/listingModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Listing.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setListing);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getListing).delete(deleteListing);

module.exports = router;