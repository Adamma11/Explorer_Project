
const directorproprietorcrc = require('../controllers/data_entry/directorproprietorcrc.controller');
const express = require('express');
const router = express.Router();

router.post("/",directorproprietorcrc.createForCde);
router.get("/findone/:caseId/:serialNumber",directorproprietorcrc.findOneForCde);
router.post("/uploadfile",directorproprietorcrc.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",directorproprietorcrc.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",directorproprietorcrc.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorproprietorcrc.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorproprietorcrc.readFileNamesForCde);
router.put("/:caseId/:componentId",directorproprietorcrc.updateForCde);

module.exports = router;