
const idb = require('../controllers/data_entry/idb.controller');
const express = require('express');
const router = express.Router();

router.post("/",idb.createForCde);
router.get("/findone/:caseId/:serialNumber",idb.findOneForCde);
router.post("/uploadfile",idb.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",idb.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",idb.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",idb.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",idb.readFileNamesForCde);
router.put("/:caseId/:componentId",idb.updateForCde);

module.exports = router;