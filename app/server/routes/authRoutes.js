const passport = require('passport');

const router = require('express').Router();

// media routes
router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/linkedin', passport.authenticate('linkedin'));

// social media callback 
/** GOOGLE */
router.get('/auth/google/callback', passport.authenticate('google',
    {
        failureRedirect: '/login',
        failureMessage: "Failed",
        successRedirect: '/',
        successMessage: "Success",
        session: false
    }, (...args) => {
        console.log("PROFILE GOOGLE");
        console.log(args[1]);
    }));

/**
 * FACEBOOK
 */
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    failureMessage: "Faile",
    successRedirect: '/',
    successMessage: "Success",
    session: false,
    scope: ['id', 'displayName', 'photos', 'email']
}, (...args) => {

    console.log("PROFILE LINKEDIN:");
    console.log(args[1]);
}));

/** LINKEDIN */
router.get('/auth/linkedin/callback', passport.authenticate('linkedin',
    {
        failureRedirect: '/login',
        failureMessage: "Failed",
        successRedirect: '/',
        successMessage: "Success",
        session: false,
        scope: ['r_emailaddress', 'r_liteprofile']
    }, (...args) => {

        console.log("PROFILE LINKEDIN:");
        console.log(args[1]);

        // res.status(200).json(req.body);
    }));

module.exports = router;