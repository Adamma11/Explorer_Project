
const workpermit = require('../controllers/data_entry/workpermit.controller');
const express = require('express');
const router = express.Router();

router.post("/",workpermit.createForCde);
router.get("/findone/:caseId/:serialNumber",workpermit.findOneForCde);
router.post("/uploadfile",workpermit.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",workpermit.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",workpermit.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",workpermit.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",workpermit.readFileNamesForCde);
router.put("/:caseId/:componentId",workpermit.updateForCde);

module.exports = router;