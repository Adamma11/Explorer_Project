
const bankstatement = require('../controllers/data_entry/bankstatement.controller');
const express = require('express');
const router = express.Router();

router.post("/",bankstatement.createForCde);
router.get("/findone/:caseId/:serialNumber",bankstatement.findOneForCde);
router.post("/uploadfile",bankstatement.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",bankstatement.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",bankstatement.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",bankstatement.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",bankstatement.readFileNamesForCde);
router.put("/:caseId/:componentId",bankstatement.updateForCde);

module.exports = router;