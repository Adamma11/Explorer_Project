
const identitytest = require('../controllers/data_entry/identitytest.controller');
const express = require('express');
const router = express.Router();

router.post("/",identitytest.createForCde);
router.get("/findone/:caseId/:serialNumber",identitytest.findOneForCde);
router.post("/uploadfile",identitytest.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",identitytest.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",identitytest.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",identitytest.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",identitytest.readFileNamesForCde);
router.put("/:caseId/:componentId",identitytest.updateForCde);

module.exports = router;