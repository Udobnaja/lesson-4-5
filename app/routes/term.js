const terminalController = require('../controllers/term');
const express = require('express');
const router = express.Router();

router
    .get('/term', terminalController.index)
    .post('/term', terminalController.execute_command);

module.exports = router;