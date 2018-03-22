const branchController = require('../controllers/branch');
const express = require('express');
const router = express.Router();

router
    .get('/branch', branchController.branch_list)
    .get('/branch/:name', branchController.branch_detail);

module.exports = router;