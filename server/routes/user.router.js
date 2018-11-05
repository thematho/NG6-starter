const express = require('express');
const router = express.Router();
const { get, save } = require('../controllers/user.controller.js');

router.get('/', get);
router.post('/', save);

module.exports = router;
