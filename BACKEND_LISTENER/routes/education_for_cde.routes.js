
const education = require('../controllers/data_entry/education.controller');
const express = require('express');
const router = express.Router();

router.post("/",education.createForCde);
router.get("/findone/:caseId/:serialNumber",education.findOneForCde);
router.post("/uploadfile",education.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",education.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",education.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",education.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",education.readFileNamesForCde);
router.put("/:caseId/:componentId",education.updateForCde);

module.exports = router;