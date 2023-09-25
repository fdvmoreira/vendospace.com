const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const authenticationCheck = require('../../../middlewares/auth/authenticationCheck');
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');
const {
  setBid,
  getBid,
  getStatsByAuctionId,
  getBidsByAuctionId,
  getBidsByAuctionIdPublic,
  deleteBidById,
} = require('../../../controllers/bidController');

// TODO: make sure that the bid is bigger than the current biggest bid before creating a new one
// TODO: make sure that bidder and the auction ID exist before creating a new one
router.post('/',
  body("bidder").trim().escape().isMongoId(),
  body("auction").trim().escape().isMongoId(),
  body("price").trim().escape().isNumeric().isDecimal(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.length > 0) { return res.status(400).json({ success: false, message: errors[0].msg }); }
    next();
  },
  setBid);

router
  .get('/:id', authenticationCheck, getBid)
  .delete('/:id', authenticationCheck, ownershipCheck, deleteBidById)
  .get('/stats/:auctionId', getStatsByAuctionId)
  .get('/auctions/:auctionId', getBidsByAuctionId)
  .get('/auctions/:auctionId/public/:no', getBidsByAuctionIdPublic);

module.exports = router;