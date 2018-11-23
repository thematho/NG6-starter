const express = require('express');
const router = express.Router();
const {
  get,
  createUser,
  enableUser,
  disableUser,
  signIn,
  signOut
} = require('../controllers/user/user.controller.js');

router.get('/', get);
router.post('/', createUser);
router.put('/enable', enableUser);
router.put('/disable', disableUser);
router.post('/authenticate', signIn);
router.delete('/authenticate', signOut);

module.exports = router;
