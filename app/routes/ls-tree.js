const lsTreeController = require('../controllers/ls-tree');
const express = require('express');
const router = express.Router({ mergeParams: true });

router
    .use('/ls-tree/:branch', lsTreeController.show_dir);

module.exports = router;


