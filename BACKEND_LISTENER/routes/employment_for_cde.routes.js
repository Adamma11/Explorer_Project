
const employment = require('../controllers/data_entry/employment.controller');
const express = require('express');
const router = express.Router();

router.post("/",employment.createForCde);
router.get("/findone/:caseId/:serialNumber",employment.findOneForCde);
router.post("/uploadfile",employment.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",employment.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",employment.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",employment.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",employment.readFileNamesForCde);
router.put("/:caseId/:componentId",employment.updateForCde);

module.exports = router;