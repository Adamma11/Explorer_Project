const caseController = require('../controllers/uploads/case.controller');
const express = require('express');
const router = express.Router();
const fs = require('fs');

console.log("In download case file routes")
router.get("/case/:caseId",caseController.downloadCaseFileForCDF);
module.exports = router;

