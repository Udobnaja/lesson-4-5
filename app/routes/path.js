const pathController = require('../controllers/path');
const express = require('express');
const router = express.Router({ mergeParams: true });

router
    .use('/path/:branch', pathController.show_dir);

module.exports = router;


