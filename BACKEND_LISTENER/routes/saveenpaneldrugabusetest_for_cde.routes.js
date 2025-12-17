
const saveenpaneldrugabusetest = require('../controllers/data_entry/saveenpaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();

router.post("/",saveenpaneldrugabusetest.createForCde);
router.get("/findone/:caseId/:serialNumber",saveenpaneldrugabusetest.findOneForCde);
router.post("/uploadfile",saveenpaneldrugabusetest.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.readFileNamesForCde);
router.put("/:caseId/:componentId",saveenpaneldrugabusetest.updateForCde);

module.exports = router;