
const identityanddigital = require('../controllers/data_entry/identityanddigital.controller');
const express = require('express');
const router = express.Router();

router.post("/",identityanddigital.createForCde);
router.get("/findone/:caseId/:serialNumber",identityanddigital.findOneForCde);
router.post("/uploadfile",identityanddigital.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",identityanddigital.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",identityanddigital.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",identityanddigital.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",identityanddigital.readFileNamesForCde);
router.put("/:caseId/:componentId",identityanddigital.updateForCde);

module.exports = router;