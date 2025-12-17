
const cvc = require('../controllers/data_entry/cvc.controller');
const express = require('express');
const router = express.Router();

router.post("/",cvc.createForCde);
router.get("/findone/:caseId/:serialNumber",cvc.findOneForCde);
router.post("/uploadfile",cvc.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",cvc.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",cvc.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",cvc.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",cvc.readFileNamesForCde);
router.put("/:caseId/:componentId",cvc.updateForCde);

module.exports = router;