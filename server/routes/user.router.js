const express = require('express');
const router = express.Router();
const { get, createUser, signIn } = require('../controllers/user.controller.js');

router.get('/', get);
router.put('/', createUser);
router.post('/authenticate', signIn);

module.exports = router;
