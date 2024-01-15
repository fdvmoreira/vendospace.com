const router = require('express').Router();
const Auction = require('../../../models/auctionModel');
const authenticationCheck = require('../../../middlewares/auth/authenticationCheck');
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');
const {
  getAllActiveAuctions,
  getAllActivePublicAuctions,
  getAuctionById,
  setAuction,
  updateAuctionById,
  deleteAuctionById,
} = require('../../../controllers/auctionController');

router.route("/")
  .get(getAllActiveAuctions)
  .post(authenticationCheck, setAuction);

router.route('/:id')
  .get(authenticationCheck, getAuctionById)
  .patch(authenticationCheck, ownershipCheck, updateAuctionById)
  .delete(authenticationCheck, ownershipCheck, deleteAuctionById);

router
  .get('/public/:no', getAllActivePublicAuctions);

module.exports = router;