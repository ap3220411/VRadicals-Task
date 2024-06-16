const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/AuthSignupController');
const { signIn } = require('../controllers/AuthSignInController');


router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
