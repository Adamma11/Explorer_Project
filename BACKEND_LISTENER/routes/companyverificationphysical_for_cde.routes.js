
const companyverificationphysical = require('../controllers/data_entry/companyverificationphysical.controller');
const express = require('express');
const router = express.Router();

router.post("/",companyverificationphysical.createForCde);
router.get("/findone/:caseId/:serialNumber",companyverificationphysical.findOneForCde);
router.post("/uploadfile",companyverificationphysical.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",companyverificationphysical.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",companyverificationphysical.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",companyverificationphysical.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",companyverificationphysical.readFileNamesForCde);
router.put("/:caseId/:componentId",companyverificationphysical.updateForCde);

module.exports = router;