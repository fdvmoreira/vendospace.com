const passport = require('passport');

const router = require('express').Router();

// media routes
router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/linkedin', passport.authenticate('linkedin'));

// social media callback 
router.get('/auth/google/callback', passport.authenticate('google',
    { failureRedirect: '/login', successRedirect: '/' }), (req, res) => {

    });

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    { failureRedirect: '/login', successRedirect: '/' }), (req, res) => {

    });

router.get('/auth/linkedin/callback', passport.authenticate('linkedin',
    { failureRedirect: '/login', successRedirect: '/' }), (req, res) => {

    });

module.exports = router;