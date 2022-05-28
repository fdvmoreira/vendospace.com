const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getSpace, setSpace, deleteSpace } = require('../../../controllers/spaceController');
const Space = require('../../../models/spaceModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Space.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setSpace);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getSpace).delete(deleteSpace);

module.exports = router;