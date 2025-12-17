
const pan = require('../controllers/data_entry/pan.controller');
const express = require('express');
const router = express.Router();

router.post("/",pan.createForCde);
router.get("/findone/:caseId/:serialNumber",pan.findOneForCde);
router.post("/uploadfile",pan.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",pan.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",pan.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",pan.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",pan.readFileNamesForCde);
router.put("/:caseId/:componentId",pan.updateForCde);

module.exports = router;