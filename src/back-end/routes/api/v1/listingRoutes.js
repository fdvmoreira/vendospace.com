const router = require('express').Router();
const authenticationCheck = require("../../../middlewares/auth/authenticationCheck");
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');
const {
  getAllListingsPublic,
  getAllListings,
  getListingById,
  setListing,
  deleteListing
} = require('../../../controllers/listingController');

router.route("/")
  .get(getAllListings)
  .post(authenticationCheck, setListing);

router.route('/:id')
  .get(authenticationCheck, getListingById)
  .delete(ownershipCheck, authenticationCheck, deleteListing);

router
  .get('/public/:no', getAllListingsPublic);

module.exports = router;