const asyncHandler = require('express-async-handler');
const Abuse = require('./../models/abuseModel');

// get abuse by id
const getAbuse = asyncHandler(async (req, res) => {
    Abuse.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create abuse
const setAbuse = asyncHandler(async (req, res) => {
    const { itemReportedId, createdBy, userReported, abuseType, message } = req.body;
    Abuse.create({ itemReportedId, createdBy, userReported, abuseType, message }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Abuse ${doc.id} reported` });
    });
});

//update  abuse
const updateAbuse = asyncHandler(async (req, res) => {
    const body = req.body;
    Abuse.findByIdAndUpdate(req.params.id, { body }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Abuse ${doc._id} updated` });
    });
});

// delete abuse
const deleteAbuse = asyncHandler(async (req, res) => {
    Abuse.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status().json({ message: `Abuse ${doc?.id} deleted` });
    });
});
module.exports = {
    getAbuse,
    setAbuse,
    updateAbuse,
    deleteAbuse
}
