
const permanentandcurrentaddress = require('../controllers/data_entry/permanentandcurrentaddress.controller');
const express = require('express');
const router = express.Router();

router.post("/",permanentandcurrentaddress.createForCde);
router.get("/findone/:caseId/:serialNumber",permanentandcurrentaddress.findOneForCde);
router.post("/uploadfile",permanentandcurrentaddress.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",permanentandcurrentaddress.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",permanentandcurrentaddress.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",permanentandcurrentaddress.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",permanentandcurrentaddress.readFileNamesForCde);
router.put("/:caseId/:componentId",permanentandcurrentaddress.updateForCde);

module.exports = router;