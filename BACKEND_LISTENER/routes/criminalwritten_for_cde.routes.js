
const criminalwritten = require('../controllers/data_entry/criminalwritten.controller');
const express = require('express');
const router = express.Router();

router.post("/",criminalwritten.createForCde);
router.get("/findone/:caseId/:serialNumber",criminalwritten.findOneForCde);
router.post("/uploadfile",criminalwritten.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",criminalwritten.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",criminalwritten.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalwritten.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalwritten.readFileNamesForCde);
router.put("/:caseId/:componentId",criminalwritten.updateForCde);

module.exports = router;