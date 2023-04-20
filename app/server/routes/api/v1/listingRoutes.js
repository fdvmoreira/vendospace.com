const router = require('express').Router();
const authenticationCheck = require("../../../middlewares/auth/authenticationCheck");
const {
  getAllListings,
  getListingById,
  setListing,
  deleteListing
} = require('../../../controllers/listingController');
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');

router.route("/")
  .get(getAllListings)
  .post(authenticationCheck, setListing);

router.route('/:id')
  .get(authenticationCheck, getListingById)
  .delete(ownershipCheck, authenticationCheck, deleteListing);

module.exports = router;