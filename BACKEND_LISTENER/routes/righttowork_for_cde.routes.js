
const righttowork = require('../controllers/data_entry/righttowork.controller');
const express = require('express');
const router = express.Router();

router.post("/",righttowork.createForCde);
router.get("/findone/:caseId/:serialNumber",righttowork.findOneForCde);
router.post("/uploadfile",righttowork.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",righttowork.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",righttowork.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",righttowork.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",righttowork.readFileNamesForCde);
router.put("/:caseId/:componentId",righttowork.updateForCde);

module.exports = router;