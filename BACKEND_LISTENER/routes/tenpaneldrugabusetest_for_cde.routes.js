
const tenpaneldrugabusetest = require('../controllers/data_entry/tenpaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();

router.post("/",tenpaneldrugabusetest.createForCde);
router.get("/findone/:caseId/:serialNumber",tenpaneldrugabusetest.findOneForCde);
router.post("/uploadfile",tenpaneldrugabusetest.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",tenpaneldrugabusetest.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",tenpaneldrugabusetest.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",tenpaneldrugabusetest.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",tenpaneldrugabusetest.readFileNamesForCde);
router.put("/:caseId/:componentId",tenpaneldrugabusetest.updateForCde);

module.exports = router;