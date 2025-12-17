
const creditcheck = require('../controllers/data_entry/creditcheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",creditcheck.createForCde);
router.get("/findone/:caseId/:serialNumber",creditcheck.findOneForCde);
router.post("/uploadfile",creditcheck.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",creditcheck.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",creditcheck.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",creditcheck.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",creditcheck.readFileNamesForCde);
router.put("/:caseId/:componentId",creditcheck.updateForCde);

module.exports = router;