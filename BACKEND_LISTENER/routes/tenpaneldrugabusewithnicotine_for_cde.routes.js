
const tenpaneldrugabusewithnicotine = require('../controllers/data_entry/tenpaneldrugabusewithnicotine.controller');
const express = require('express');
const router = express.Router();

router.post("/",tenpaneldrugabusewithnicotine.createForCde);
router.get("/findone/:caseId/:serialNumber",tenpaneldrugabusewithnicotine.findOneForCde);
router.post("/uploadfile",tenpaneldrugabusewithnicotine.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.readFileNamesForCde);
router.put("/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateForCde);

module.exports = router;