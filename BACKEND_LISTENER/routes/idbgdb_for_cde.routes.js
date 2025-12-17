
const idbgdb = require('../controllers/data_entry/idbgdb.controller');
const express = require('express');
const router = express.Router();

router.post("/",idbgdb.createForCde);
router.get("/findone/:caseId/:serialNumber",idbgdb.findOneForCde);
router.post("/uploadfile",idbgdb.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",idbgdb.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",idbgdb.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",idbgdb.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",idbgdb.readFileNamesForCde);
router.put("/:caseId/:componentId",idbgdb.updateForCde);

module.exports = router;