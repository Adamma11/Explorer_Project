
const personalreference = require('../controllers/data_entry/personalreference.controller');
const express = require('express');
const router = express.Router();

router.post("/",personalreference.createForCde);
router.get("/findone/:caseId/:serialNumber",personalreference.findOneForCde);
router.post("/uploadfile",personalreference.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",personalreference.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",personalreference.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",personalreference.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",personalreference.readFileNamesForCde);
router.put("/:caseId/:componentId",personalreference.updateForCde);

module.exports = router;