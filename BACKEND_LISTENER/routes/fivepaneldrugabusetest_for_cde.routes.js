
const fivepaneldrugabusetest = require('../controllers/data_entry/fivepaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();

router.post("/",fivepaneldrugabusetest.createForCde);
router.get("/findone/:caseId/:serialNumber",fivepaneldrugabusetest.findOneForCde);
router.post("/uploadfile",fivepaneldrugabusetest.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",fivepaneldrugabusetest.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",fivepaneldrugabusetest.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",fivepaneldrugabusetest.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",fivepaneldrugabusetest.readFileNamesForCde);
router.put("/:caseId/:componentId",fivepaneldrugabusetest.updateForCde);

module.exports = router;