const firstSourceCaseController = require('../controllers/uploads/firstsource_case.controller');
const caseInitiationChecks  = require ('../controllers/uploads/api_case_initiation.controller.js')
const automateInception  = require ('../controllers/uploads/automate_case_inception.controller.js')
const express = require('express');
const router = express.Router();
const fs = require('fs');


router.post("/case_initiation",firstSourceCaseController.create);
router.post("/case_initiation_checks",caseInitiationChecks.create);
router.patch("/updateInceptionQC",automateInception.updateInceptionQcStatus);
module.exports = router;
