
const referenceabe = require('../controllers/data_entry/referenceabe.controller');
const express = require('express');
const router = express.Router();

router.post("/",referenceabe.createForCde);
router.get("/findone/:caseId/:serialNumber",referenceabe.findOneForCde);
router.post("/uploadfile",referenceabe.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",referenceabe.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",referenceabe.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",referenceabe.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",referenceabe.readFileNamesForCde);
router.put("/:caseId/:componentId",referenceabe.updateForCde);

module.exports = router;