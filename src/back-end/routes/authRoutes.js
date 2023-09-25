const router = require('express').Router();

router.use(require('./auth/login'));
router.use(require('./auth/signup'));
router.use(require('./auth/google'));
router.use(require('./auth/facebook'));
router.use(require('./auth/linkedin'));

module.exports = router;