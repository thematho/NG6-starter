const express = require('express');
const router = express.Router();
const { get, createUser, signIn, signOut } = require('../controllers/user.controller.js');

router.get('/', get);
router.put('/', createUser);
router.post('/authenticate', signIn);
router.delete('/authenticate', signOut);

module.exports = router;
