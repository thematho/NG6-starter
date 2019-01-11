const express = require('express');
const router = express.Router();
const { publicKey } = require('../services/security/security.service');
const {
  signIn,
  signOut
} = require('../controllers/user/user.controller.js');

router.get('/publicKey', (req, res, ) => {
  res.json({ publicKey });
});

router.post('/authenticate', signIn);
router.delete('/authenticate', signOut);

module.exports = router;
