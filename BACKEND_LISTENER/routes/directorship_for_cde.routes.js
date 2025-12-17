
const directorship = require('../controllers/data_entry/directorship.controller');
const express = require('express');
const router = express.Router();

router.post("/",directorship.createForCde);
router.get("/findone/:caseId/:serialNumber",directorship.findOneForCde);
router.post("/uploadfile",directorship.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",directorship.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",directorship.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorship.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorship.readFileNamesForCde);
router.put("/:caseId/:componentId",directorship.updateForCde);

module.exports = router;