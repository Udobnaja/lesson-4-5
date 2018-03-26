const terminalController = require('../controllers/term');
const express = require('express');
/* eslint new-cap: ["error", { "capIsNew": false }]*/
const router = express.Router();

router
    .get('/term', terminalController.index)
    .post('/term', terminalController.executeCommand);

module.exports = router;
