const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { getBid, setBid, deleteBid } = require('../../../controllers/bidController');

// TODO: make sure that the bid is bigger than the current biggest bid before creating a new one
router.post('/',
    body("bidder").isHexadecimal().isByteLength(12),
    body("auction").isHexadecimal().isByteLength(12),
    body("price").isDecimal(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.length > 0) { return res.status(400).json({ success: false, message: errors[0].msg }); }
        next();
    }, setBid);

router.route('/:id').get(getBid).delete(deleteBid);

module.exports = router;