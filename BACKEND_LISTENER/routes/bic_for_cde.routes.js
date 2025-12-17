
const bic = require('../controllers/data_entry/bic.controller');
const express = require('express');
const router = express.Router();

router.post("/",bic.createForCde);
router.get("/findone/:caseId/:serialNumber",bic.findOneForCde);
router.post("/uploadfile",bic.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",bic.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",bic.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",bic.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",bic.readFileNamesForCde);
router.put("/:caseId/:componentId",bic.updateForCde);

module.exports = router;