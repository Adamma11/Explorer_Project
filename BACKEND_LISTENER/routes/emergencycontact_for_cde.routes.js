
const emergencycontact = require('../controllers/data_entry/emergencycontact.controller');
const express = require('express');
const router = express.Router();

router.post("/",emergencycontact.createForCde);
router.get("/findone/:caseId/:serialNumber",emergencycontact.findOneForCde);
router.post("/uploadfile",emergencycontact.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",emergencycontact.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",emergencycontact.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",emergencycontact.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",emergencycontact.readFileNamesForCde);
router.put("/:caseId/:componentId",emergencycontact.updateForCde);

module.exports = router;