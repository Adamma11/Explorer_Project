
const criminalcourtrecordcheckpermanentaddress = require('../controllers/data_entry/criminalcourtrecordcheckpermanentaddress.controller');
const express = require('express');
const router = express.Router();

router.post("/",criminalcourtrecordcheckpermanentaddress.createForCde);
router.get("/findone/:caseId/:serialNumber",criminalcourtrecordcheckpermanentaddress.findOneForCde);
router.post("/uploadfile",criminalcourtrecordcheckpermanentaddress.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.readFileNamesForCde);
router.put("/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateForCde);

module.exports = router;