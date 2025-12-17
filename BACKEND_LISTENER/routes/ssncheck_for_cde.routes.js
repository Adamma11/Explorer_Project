
const ssncheck = require('../controllers/data_entry/ssncheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",ssncheck.createForCde);
router.get("/findone/:caseId/:serialNumber",ssncheck.findOneForCde);
router.post("/uploadfile",ssncheck.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",ssncheck.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",ssncheck.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",ssncheck.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",ssncheck.readFileNamesForCde);
router.put("/:caseId/:componentId",ssncheck.updateForCde);

module.exports = router;