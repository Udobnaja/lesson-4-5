const treeController = require('../controllers/tree');
const express = require('express');
const router = express.Router();

router
    .get('/tree/:hash', treeController.tree_list);

module.exports = router;