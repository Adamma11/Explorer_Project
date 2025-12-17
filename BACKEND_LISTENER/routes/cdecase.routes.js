const caseController = require('../controllers/uploads/case.controller');
const clientContractProfileController = require('../controllers/administration/client_contract_profile.controller');
const clientContractPackageController = require('../controllers/administration/client_contract_package.controller');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get("/getcdecasedetails",caseController.getCdeCaseDetails)
router.get("/getcdecaseprofiledetails/:_id",clientContractProfileController.getProfileDetailsForCde)
router.get("/getcdecasepackagedetails/:_id",clientContractPackageController.getPackageDetailsForCde)
router.post("/saveauthorizationsignature",caseController.saveAuthorizationSignature)
module.exports = router;

