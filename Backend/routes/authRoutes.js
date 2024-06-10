const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/HRauthController');
const { AdminSignUp } = require('../controllers/AdminAuthController');
const { signIn } = require('../controllers/AuthSignInController');

router.post('/signup/Admin', AdminSignUp);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
