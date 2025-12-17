
const criminalonline = require('../controllers/data_entry/criminalonline.controller');
const express = require('express');
const router = express.Router();

router.post("/",criminalonline.createForCde);
router.get("/findone/:caseId/:serialNumber",criminalonline.findOneForCde);
router.post("/uploadfile",criminalonline.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",criminalonline.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",criminalonline.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalonline.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalonline.readFileNamesForCde);
router.put("/:caseId/:componentId",criminalonline.updateForCde);

module.exports = router;