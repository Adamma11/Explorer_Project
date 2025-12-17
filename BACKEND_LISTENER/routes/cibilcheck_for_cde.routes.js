
const cibilcheck = require('../controllers/data_entry/cibilcheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",cibilcheck.createForCde);
router.get("/findone/:caseId/:serialNumber",cibilcheck.findOneForCde);
router.post("/uploadfile",cibilcheck.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",cibilcheck.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",cibilcheck.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",cibilcheck.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",cibilcheck.readFileNamesForCde);
router.put("/:caseId/:componentId",cibilcheck.updateForCde);

module.exports = router;