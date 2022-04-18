const router = require('express').Router();
const login = require("../middlewares/login");

// router.post('/login', (req, res) => res.json({ message: 'Login' }));                                // login
router.post('/login', login);                                // login

router.post('/register', (req, res) => res.json({ message: 'Register' }));                          // register

router.get('/', (req, res) => res.json({ message: 'Home Page' }));                                  // home
router.get('/about', (req, res) => res.json({ message: 'About Us' }));                              // about
router.get('/contact', (req, res) => res.json({ message: 'Contact Us' }));                          // contact
router.get('/terms-and-conditions', (req, res) => res.json({ message: 'T&Cs' }));                   // T&Cs
router.get('/privacy-policy', (req, res) => res.json({ message: 'Policy' }));                       // Privacy

module.exports = router;