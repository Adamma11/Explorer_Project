
const uan = require('../controllers/data_entry/uan.controller');
const express = require('express');
const router = express.Router();

router.post("/",uan.createForCde);
router.get("/findone/:caseId/:serialNumber",uan.findOneForCde);
router.post("/uploadfile",uan.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",uan.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",uan.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",uan.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",uan.readFileNamesForCde);
router.put("/:caseId/:componentId",uan.updateForCde);

module.exports = router;