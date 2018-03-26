const lsTreeController = require('../controllers/ls-tree');
const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router({mergeParams: true});

router
    .use('/ls-tree/:branch', lsTreeController.renderLsTree);

module.exports = router;


