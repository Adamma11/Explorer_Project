
const dinverification = require('../controllers/data_entry/dinverification.controller');
const express = require('express');
const router = express.Router();

router.post("/",dinverification.createForCde);
router.get("/findone/:caseId/:serialNumber",dinverification.findOneForCde);
router.post("/uploadfile",dinverification.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",dinverification.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",dinverification.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",dinverification.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",dinverification.readFileNamesForCde);
router.put("/:caseId/:componentId",dinverification.updateForCde);

module.exports = router;