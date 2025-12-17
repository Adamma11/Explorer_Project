
const gsa = require('../controllers/data_entry/gsa.controller');
const express = require('express');
const router = express.Router();

router.post("/",gsa.createForCde);
router.get("/findone/:caseId/:serialNumber",gsa.findOneForCde);
router.post("/uploadfile",gsa.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",gsa.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",gsa.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",gsa.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",gsa.readFileNamesForCde);
router.put("/:caseId/:componentId",gsa.updateForCde);

module.exports = router;