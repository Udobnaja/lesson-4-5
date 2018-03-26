const blobController = require('../controllers/blob');
const express = require('express');
const router = express.Router({mergeParams: true});
/* eslint new-cap: ["error", { "capIsNew": false }]*/
router
    .use('/blob/:branch/(*/)?:filename', blobController.renderBlobContent);

module.exports = router;
