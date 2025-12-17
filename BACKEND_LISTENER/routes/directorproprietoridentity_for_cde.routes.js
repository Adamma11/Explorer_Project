
const directorproprietoridentity = require('../controllers/data_entry/directorproprietoridentity.controller');
const express = require('express');
const router = express.Router();

router.post("/",directorproprietoridentity.createForCde);
router.get("/findone/:caseId/:serialNumber",directorproprietoridentity.findOneForCde);
router.post("/uploadfile",directorproprietoridentity.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",directorproprietoridentity.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",directorproprietoridentity.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorproprietoridentity.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorproprietoridentity.readFileNamesForCde);
router.put("/:caseId/:componentId",directorproprietoridentity.updateForCde);

module.exports = router;