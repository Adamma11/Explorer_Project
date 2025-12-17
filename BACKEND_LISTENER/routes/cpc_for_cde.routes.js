
const cpc = require('../controllers/data_entry/cpc.controller');
const express = require('express');
const router = express.Router();

router.post("/",cpc.createForCde);
router.get("/findone/:caseId/:serialNumber",cpc.findOneForCde);
router.post("/uploadfile",cpc.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",cpc.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",cpc.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",cpc.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",cpc.readFileNamesForCde);
router.put("/:caseId/:componentId",cpc.updateForCde);

module.exports = router;