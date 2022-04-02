const asyncHandler = require('express-async-handler');
const { Abuse } = require('./../models/abuseModel');

// get abuse by id
const getAbuse = asyncHandler(async (req, res) => {
    Abuse.findById(req.params.id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

// create abuse
const setAbuse = asyncHandler(async (req, res) => {
    const { itemReportedId, createdBy, userReported, abuseType } = req.body;
    Abuse.create({ itemReportedId, createdBy, userReported, abuseType }, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(201).json({ message: `Abuse ${doc.id} reported` });
    });
});

//update  abuse
const updateAbuse = asyncHandler(async (req, res) => {

});

// delete abuse
const deleteAbuse = asyncHandler(async (req, res) => {

});
module.exports = {
    getAbuse,
    setAbuse,
    updateAbuse,
    deleteAbuse
}
