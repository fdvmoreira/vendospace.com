const asyncHandler = require("express-async-handler");
const router = require('express').Router();
const {
  getAccount,
  setAccount,
  updateAccount,
  deleteAccount
} = require('../../../controllers/accountController');
const Account = require('../../../models/accountModel');
const authenticationCheck = require('../../../middlewares/auth/authenticationCheck');
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');

router.route("/").get(asyncHandler(async (req, res) => { // todo - remove this route
  Account.find((error, accounts) => {
    if (error) res.status(400).json({ success: false, error: `You've messed up: ${error.message}`, data: error });
    if (!accounts?.length) res.status(404).json({ success: false, message: `Found ${accounts.length}`, data: error });
    res.json({ success: true, message: `Found ${accounts.length} accounts`, data: accounts });
  });

})).post(setAccount);

router.route('/:id')
  .get(authenticationCheck, ownershipCheck, getAccount)
  .post(authenticationCheck, ownershipCheck, updateAccount)
  .delete(authenticationCheck, ownershipCheck, deleteAccount);

module.exports = router;