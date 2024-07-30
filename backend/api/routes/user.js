const express = require('express');
const { userSignUp, userSignIn } = require('../controllers/userController')

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);

module.exports = router;
