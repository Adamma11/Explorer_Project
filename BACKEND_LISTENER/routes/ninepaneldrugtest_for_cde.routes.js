
const ninepaneldrugtest = require('../controllers/data_entry/ninepaneldrugtest.controller');
const express = require('express');
const router = express.Router();

router.post("/",ninepaneldrugtest.createForCde);
router.get("/findone/:caseId/:serialNumber",ninepaneldrugtest.findOneForCde);
router.post("/uploadfile",ninepaneldrugtest.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",ninepaneldrugtest.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",ninepaneldrugtest.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",ninepaneldrugtest.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",ninepaneldrugtest.readFileNamesForCde);
router.put("/:caseId/:componentId",ninepaneldrugtest.updateForCde);

module.exports = router;