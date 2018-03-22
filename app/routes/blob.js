const blobController = require('../controllers/blob');
const express = require('express');
const router = express.Router({ mergeParams: true });

router
    .use('/blob/:branch/:filename', blobController.blob_content);

module.exports = router;