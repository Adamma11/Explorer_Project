
const testidentity = require('../controllers/data_entry/testidentity.controller');
const express = require('express');
const router = express.Router();

router.post("/",testidentity.createForCde);
router.get("/findone/:caseId/:serialNumber",testidentity.findOneForCde);
router.post("/uploadfile",testidentity.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",testidentity.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",testidentity.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",testidentity.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",testidentity.readFileNamesForCde);
router.put("/:caseId/:componentId",testidentity.updateForCde);

module.exports = router;