const branchController = require('../controllers/branch');
const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();

router
    .get('/branch', branchController.renderBranchList)
    .get('/branch/:name', branchController.renderBranchDetail);

module.exports = router;
