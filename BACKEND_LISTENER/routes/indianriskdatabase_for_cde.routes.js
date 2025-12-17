
const indianriskdatabase = require('../controllers/data_entry/indianriskdatabase.controller');
const express = require('express');
const router = express.Router();

router.post("/",indianriskdatabase.createForCde);
router.get("/findone/:caseId/:serialNumber",indianriskdatabase.findOneForCde);
router.post("/uploadfile",indianriskdatabase.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",indianriskdatabase.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",indianriskdatabase.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",indianriskdatabase.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",indianriskdatabase.readFileNamesForCde);
router.put("/:caseId/:componentId",indianriskdatabase.updateForCde);

module.exports = router;