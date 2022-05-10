const router = require('express').Router();
const { getBid, setBid, deleteBid } = require('../../../controllers/bidController');

router.post('/', setBid);
router.route('/:id').get(getBid).delete(deleteBid);

module.exports = router;