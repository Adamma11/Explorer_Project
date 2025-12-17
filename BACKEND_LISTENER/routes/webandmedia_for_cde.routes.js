
const webandmedia = require('../controllers/data_entry/webandmedia.controller');
const express = require('express');
const router = express.Router();

router.post("/",webandmedia.createForCde);
router.get("/findone/:caseId/:serialNumber",webandmedia.findOneForCde);
router.post("/uploadfile",webandmedia.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",webandmedia.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",webandmedia.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",webandmedia.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",webandmedia.readFileNamesForCde);
router.put("/:caseId/:componentId",webandmedia.updateForCde);

module.exports = router;