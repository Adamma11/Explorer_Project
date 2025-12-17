
const nationalitywithrighttowork = require('../controllers/data_entry/nationalitywithrighttowork.controller');
const express = require('express');
const router = express.Router();

router.post("/",nationalitywithrighttowork.createForCde);
router.get("/findone/:caseId/:serialNumber",nationalitywithrighttowork.findOneForCde);
router.post("/uploadfile",nationalitywithrighttowork.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",nationalitywithrighttowork.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",nationalitywithrighttowork.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",nationalitywithrighttowork.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",nationalitywithrighttowork.readFileNamesForCde);
router.put("/:caseId/:componentId",nationalitywithrighttowork.updateForCde);

module.exports = router;