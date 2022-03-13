const express = require('express');
const router = express.Router();
const { getUser } = require('./../controllers/userController');


router.route('/:id').get(getUser);

module.exports = router;