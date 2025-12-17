
const employmenttest3 = require('../controllers/data_entry/employmenttest3.controller');
const express = require('express');
const router = express.Router();

router.post("/",employmenttest3.createForCde);
router.get("/findone/:caseId/:serialNumber",employmenttest3.findOneForCde);
router.post("/uploadfile",employmenttest3.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",employmenttest3.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",employmenttest3.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",employmenttest3.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",employmenttest3.readFileNamesForCde);
router.put("/:caseId/:componentId",employmenttest3.updateForCde);

module.exports = router;