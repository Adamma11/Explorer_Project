
const gapanalysis = require('../controllers/data_entry/gapanalysis.controller');
const express = require('express');
const router = express.Router();

router.post("/",gapanalysis.createForCde);
router.get("/findone/:caseId/:serialNumber",gapanalysis.findOneForCde);
router.post("/uploadfile",gapanalysis.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",gapanalysis.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",gapanalysis.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",gapanalysis.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",gapanalysis.readFileNamesForCde);
router.put("/:caseId/:componentId",gapanalysis.updateForCde);

module.exports = router;