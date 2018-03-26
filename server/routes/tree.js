const treeController = require('../controllers/tree');
const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();

router
    .get('/tree/:branch/:hash', treeController.renderTree);

module.exports = router;
