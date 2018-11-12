const express = require('express');
const router = express.Router();
const security = require('../security');
const { get, createUser, signIn } = require('../controllers/user.controller.js');

router.get('/', security.validateUser, get);
router.put('/', security.validateUser, createUser);
router.post('/authenticate', signIn);

module.exports = router;
