
const companyverificationonline = require('../controllers/data_entry/companyverificationonline.controller');
const express = require('express');
const router = express.Router();

router.post("/",companyverificationonline.createForCde);
router.get("/findone/:caseId/:serialNumber",companyverificationonline.findOneForCde);
router.post("/uploadfile",companyverificationonline.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",companyverificationonline.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",companyverificationonline.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",companyverificationonline.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",companyverificationonline.readFileNamesForCde);
router.put("/:caseId/:componentId",companyverificationonline.updateForCde);

module.exports = router;