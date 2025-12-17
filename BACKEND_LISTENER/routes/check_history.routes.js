const express = require('express');
const router = express.Router();
const checkHistoryController = require('../controllers/administration/checkHistory.controller');

router.get('/check-history/:caseId/:componentId', checkHistoryController.getCheckHistory);

module.exports = router;

