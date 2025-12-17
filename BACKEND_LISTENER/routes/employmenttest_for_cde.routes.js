
const employmenttest = require('../controllers/data_entry/employmenttest.controller');
const express = require('express');
const router = express.Router();

router.post("/",employmenttest.createForCde);
router.get("/findone/:caseId/:serialNumber",employmenttest.findOneForCde);
router.post("/uploadfile",employmenttest.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",employmenttest.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",employmenttest.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",employmenttest.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",employmenttest.readFileNamesForCde);
router.put("/:caseId/:componentId",employmenttest.updateForCde);

module.exports = router;