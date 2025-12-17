
const identity = require('../controllers/data_entry/identity.controller');
const express = require('express');
const router = express.Router();

router.post("/",identity.createForCde);
router.get("/findone/:caseId/:serialNumber",identity.findOneForCde);
router.post("/uploadfile",identity.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",identity.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",identity.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",identity.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",identity.readFileNamesForCde);
router.put("/:caseId/:componentId",identity.updateForCde);

module.exports = router;