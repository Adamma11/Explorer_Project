
const bankruptcyandinsolvency = require('../controllers/data_entry/bankruptcyandinsolvency.controller');
const express = require('express');
const router = express.Router();

router.post("/",bankruptcyandinsolvency.createForCde);
router.get("/findone/:caseId/:serialNumber",bankruptcyandinsolvency.findOneForCde);
router.post("/uploadfile",bankruptcyandinsolvency.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",bankruptcyandinsolvency.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",bankruptcyandinsolvency.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",bankruptcyandinsolvency.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",bankruptcyandinsolvency.readFileNamesForCde);
router.put("/:caseId/:componentId",bankruptcyandinsolvency.updateForCde);

module.exports = router;