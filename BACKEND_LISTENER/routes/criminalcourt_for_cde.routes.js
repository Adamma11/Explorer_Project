
const criminalcourt = require('../controllers/data_entry/criminalcourt.controller');
const express = require('express');
const router = express.Router();

router.post("/",criminalcourt.createForCde);
router.get("/findone/:caseId/:serialNumber",criminalcourt.findOneForCde);
router.post("/uploadfile",criminalcourt.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",criminalcourt.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",criminalcourt.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalcourt.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalcourt.readFileNamesForCde);
router.put("/:caseId/:componentId",criminalcourt.updateForCde);

module.exports = router;