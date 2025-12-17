
const digitcurrentandpermanentaddress = require('../controllers/data_entry/digitcurrentandpermanentaddress.controller');
const express = require('express');
const router = express.Router();

router.post("/",digitcurrentandpermanentaddress.createForCde);
router.get("/findone/:caseId/:serialNumber",digitcurrentandpermanentaddress.findOneForCde);
router.post("/uploadfile",digitcurrentandpermanentaddress.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.readFileNamesForCde);
router.put("/:caseId/:componentId",digitcurrentandpermanentaddress.updateForCde);

module.exports = router;