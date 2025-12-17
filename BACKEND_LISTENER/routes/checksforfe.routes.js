const checksforfe = require('../controllers/data_entry/checksforfe.controller');
const express = require('express');
const router = express.Router();

router.get("/checksallocatedtome",checksforfe.findChecksAllocatedToMe);

module.exports = router;
