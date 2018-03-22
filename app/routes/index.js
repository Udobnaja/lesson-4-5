const express = require('express');
const router = express.Router();
const indexController = require('../controllers');

router
    .all('/', indexController.index);

module.exports = router;