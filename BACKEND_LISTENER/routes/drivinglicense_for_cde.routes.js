
const drivinglicense = require('../controllers/data_entry/drivinglicense.controller');
const express = require('express');
const router = express.Router();

router.post("/",drivinglicense.createForCde);
router.get("/findone/:caseId/:serialNumber",drivinglicense.findOneForCde);
router.post("/uploadfile",drivinglicense.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",drivinglicense.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",drivinglicense.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",drivinglicense.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",drivinglicense.readFileNamesForCde);
router.put("/:caseId/:componentId",drivinglicense.updateForCde);

module.exports = router;