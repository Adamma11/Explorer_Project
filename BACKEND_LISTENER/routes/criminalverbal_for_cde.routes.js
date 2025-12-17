
const criminalverbal = require('../controllers/data_entry/criminalverbal.controller');
const express = require('express');
const router = express.Router();

router.post("/",criminalverbal.createForCde);
router.get("/findone/:caseId/:serialNumber",criminalverbal.findOneForCde);
router.post("/uploadfile",criminalverbal.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",criminalverbal.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",criminalverbal.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalverbal.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalverbal.readFileNamesForCde);
router.put("/:caseId/:componentId",criminalverbal.updateForCde);

module.exports = router;