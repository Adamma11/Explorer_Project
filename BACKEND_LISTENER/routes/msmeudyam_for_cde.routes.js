
const msmeudyam = require('../controllers/data_entry/msmeudyam.controller');
const express = require('express');
const router = express.Router();

router.post("/",msmeudyam.createForCde);
router.get("/findone/:caseId/:serialNumber",msmeudyam.findOneForCde);
router.post("/uploadfile",msmeudyam.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",msmeudyam.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",msmeudyam.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",msmeudyam.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",msmeudyam.readFileNamesForCde);
router.put("/:caseId/:componentId",msmeudyam.updateForCde);

module.exports = router;