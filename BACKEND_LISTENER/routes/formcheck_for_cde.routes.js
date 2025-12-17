
const formcheck = require('../controllers/data_entry/formcheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",formcheck.createForCde);
router.get("/findone/:caseId/:serialNumber",formcheck.findOneForCde);
router.post("/uploadfile",formcheck.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",formcheck.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",formcheck.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",formcheck.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",formcheck.readFileNamesForCde);
router.put("/:caseId/:componentId",formcheck.updateForCde);

module.exports = router;