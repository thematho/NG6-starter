const express = require('express');
const router = express.Router();
const { get, save } = require('../controllers/task/task.controller.js');

/* GET users listing. */
router.get('/', get);
router.post('/', save);

module.exports = router;
