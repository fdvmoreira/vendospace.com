const router = require('express').Router();

router.post('/login');                          // login
router.post('/register');                       // register

router.get('/');                                // home
router.get('/about-us');                        // about
router.get('/contact-us');                      // contact
router.get('/terms-and-conditions');            // T&Cs
router.get('/privacy-policy');                  // Privacy

