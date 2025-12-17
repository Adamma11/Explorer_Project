
const currentaddress = require('../controllers/data_entry/currentaddress.controller');
const express = require('express');
const router = express.Router();

router.post("/",currentaddress.createForCde);
router.get("/findone/:caseId/:serialNumber",currentaddress.findOneForCde);
router.post("/uploadfile",currentaddress.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",currentaddress.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",currentaddress.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",currentaddress.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",currentaddress.readFileNamesForCde);
router.put("/:caseId/:componentId",currentaddress.updateForCde);

module.exports = router;