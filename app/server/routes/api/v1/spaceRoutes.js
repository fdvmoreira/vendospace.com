const express = require('express');
const asynHandler = require("express-async-handler");
const router = express.Router();
const {
  getSpaceById,
  getSpaceByIdPublic,
  updateSpaceById,
  setSpace,
  deleteSpace
} = require('../../../controllers/spaceController');
const Space = require('../../../models/spaceModel');
const authenticationCheck = require('../../../middlewares/auth/authenticationCheck');
const ownershipCheck = require('../../../middlewares/auth/ownershipCheck');

router.route("/").get(asynHandler(async (req, res) => { // todo - remove this route
  Space.find((err, doc) => {
    if (err) res.status(400).json({ error: `You've messed up: ${err.message}` });
    res.status(200).json(doc);
  });

})).post(setSpace);

router.route('/:id')
  .get(authenticationCheck, getSpaceById)
  .patch(authenticationCheck, ownershipCheck, updateSpaceById)
  .delete(authenticationCheck, ownershipCheck, deleteSpace);

router.get('/:id/public', getSpaceByIdPublic);
module.exports = router;