
const idbglobalsanctions = require('../controllers/data_entry/idbglobalsanctions.controller');
const express = require('express');
const router = express.Router();

router.post("/",idbglobalsanctions.createForCde);
router.get("/findone/:caseId/:serialNumber",idbglobalsanctions.findOneForCde);
router.post("/uploadfile",idbglobalsanctions.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",idbglobalsanctions.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",idbglobalsanctions.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",idbglobalsanctions.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",idbglobalsanctions.readFileNamesForCde);
router.put("/:caseId/:componentId",idbglobalsanctions.updateForCde);

module.exports = router;