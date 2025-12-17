
const cfbusa = require('../controllers/data_entry/cfbusa.controller');
const express = require('express');
const router = express.Router();

router.post("/",cfbusa.createForCde);
router.get("/findone/:caseId/:serialNumber",cfbusa.findOneForCde);
router.post("/uploadfile",cfbusa.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",cfbusa.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",cfbusa.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",cfbusa.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",cfbusa.readFileNamesForCde);
router.put("/:caseId/:componentId",cfbusa.updateForCde);

module.exports = router;