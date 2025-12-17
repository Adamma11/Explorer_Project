
const digitalcurrentaddress = require('../controllers/data_entry/digitalcurrentaddress.controller');
const express = require('express');
const router = express.Router();

router.post("/",digitalcurrentaddress.createForCde);
router.get("/findone/:caseId/:serialNumber",digitalcurrentaddress.findOneForCde);
router.post("/uploadfile",digitalcurrentaddress.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",digitalcurrentaddress.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",digitalcurrentaddress.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",digitalcurrentaddress.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",digitalcurrentaddress.readFileNamesForCde);
router.put("/:caseId/:componentId",digitalcurrentaddress.updateForCde);

module.exports = router;