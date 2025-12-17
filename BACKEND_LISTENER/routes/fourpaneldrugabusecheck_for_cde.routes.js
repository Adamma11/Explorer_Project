
const fourpaneldrugabusecheck = require('../controllers/data_entry/fourpaneldrugabusecheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",fourpaneldrugabusecheck.createForCde);
router.get("/findone/:caseId/:serialNumber",fourpaneldrugabusecheck.findOneForCde);
router.post("/uploadfile",fourpaneldrugabusecheck.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.readFileNamesForCde);
router.put("/:caseId/:componentId",fourpaneldrugabusecheck.updateForCde);

module.exports = router;