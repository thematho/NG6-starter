const express = require('express');
const router = express.Router();
const {
  get,
  createUser,
  enableUser,
  disableUser,
} = require('../controllers/user/user.controller.js');

router.get('/', get);
router.post('/', createUser);
router.put('/enable', enableUser);
router.put('/disable', disableUser);

module.exports = router;
