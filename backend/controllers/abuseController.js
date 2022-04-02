const asyncHandler = require('express-async-handler');
const { Abuse } = require('./../models/abuseModel');

// get abuse by id
const getAbuse = asyncHandler(async (req, res) => {
    const { id } = req.body;

    Abuse.findById(id, (err, doc) => {
        if (err) res.status(400).json({ Error: `${err.message}` });

        res.status(200).json(doc);
    });
});

module.exports = {
    getAbuse
}
