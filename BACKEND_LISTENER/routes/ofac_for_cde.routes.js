
const ofac = require('../controllers/data_entry/ofac.controller');
const express = require('express');
const router = express.Router();

router.post("/",ofac.createForCde);
router.get("/findone/:caseId/:serialNumber",ofac.findOneForCde);
router.post("/uploadfile",ofac.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",ofac.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",ofac.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",ofac.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",ofac.readFileNamesForCde);
router.put("/:caseId/:componentId",ofac.updateForCde);

module.exports = router;