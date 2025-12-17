
const professionalreference = require('../controllers/data_entry/professionalreference.controller');
const express = require('express');
const router = express.Router();

router.post("/",professionalreference.createForCde);
router.get("/findone/:caseId/:serialNumber",professionalreference.findOneForCde);
router.post("/uploadfile",professionalreference.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",professionalreference.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",professionalreference.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",professionalreference.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",professionalreference.readFileNamesForCde);
router.put("/:caseId/:componentId",professionalreference.updateForCde);

module.exports = router;