
const kyc = require('../controllers/data_entry/kyc.controller');
const express = require('express');
const router = express.Router();

router.post("/",kyc.createForCde);
router.get("/findone/:caseId/:serialNumber",kyc.findOneForCde);
router.post("/uploadfile",kyc.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",kyc.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",kyc.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",kyc.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",kyc.readFileNamesForCde);
router.put("/:caseId/:componentId",kyc.updateForCde);

module.exports = router;