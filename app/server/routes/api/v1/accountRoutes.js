const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const { getAccount, setAccount, deleteAccount } = require('../../../controllers/accountController');
const Account = require('../../../models/accountModel');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
    Account.find((err, doc) => {
        if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
        res.status(200).json(doc);
    });

})).post(setAccount);

// todo -remove delete route because the database must keep history 
// only deactive the account when the use requests delete account
router.route('/:id').get(getAccount).delete(deleteAccount);

module.exports = router;