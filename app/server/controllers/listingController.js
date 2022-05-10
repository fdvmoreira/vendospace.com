const asyncHandler = require('express-async-handler');
const { Listing } = require('./../models/listingModel');

// get Listing by id
const getListing = asyncHandler(async (req, res) => {
    Listing.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create Listing
const setListing = asyncHandler(async (req, res) => {
    const { itemReportedId, createdBy, userReported, ListingType } = req.body;
    Listing.create({ itemReportedId, createdBy, userReported, ListingType }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Listing ${doc.id} created` });
    });
});

//update  Listing
const updateListing = asyncHandler(async (req, res) => {
    const body = req.body;
    Listing.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Listing ${doc._id} updated` });
    });
});

// delete Listing
const deleteListing = asyncHandler(async (req, res) => {
    Listing.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status().json({ message: `Listing ${doc?.id} deleted` });
    });
});
module.exports = {
    getListing,
    setListing,
    updateListing,
    deleteListing
}
