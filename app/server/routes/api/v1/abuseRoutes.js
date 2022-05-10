const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getAbuse, setAbuse, deleteAbuse } = require('../../../controllers/abuseController');
const Abuse = require('../../../models/abuseModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Abuse.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setAbuse);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getAbuse).delete(deleteAbuse);

module.exports = router;