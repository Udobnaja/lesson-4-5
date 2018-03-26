const express = require('express');
const router = express.Router();
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const indexController = require('../controllers');

router
    .all('/', indexController.index);

module.exports = router;
