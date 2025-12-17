
const academicreference = require('../controllers/data_entry/academicreference.controller');
const express = require('express');
const router = express.Router();

router.post("/",academicreference.createForCde);
router.get("/findone/:caseId/:serialNumber",academicreference.findOneForCde);
router.post("/uploadfile",academicreference.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",academicreference.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",academicreference.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",academicreference.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",academicreference.readFileNamesForCde);
router.put("/:caseId/:componentId",academicreference.updateForCde);

module.exports = router;