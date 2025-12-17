
const pvc = require('../controllers/data_entry/pvc.controller');
const express = require('express');
const router = express.Router();

router.post("/",pvc.createForCde);
router.get("/findone/:caseId/:serialNumber",pvc.findOneForCde);
router.post("/uploadfile",pvc.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",pvc.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",pvc.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",pvc.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",pvc.readFileNamesForCde);
router.put("/:caseId/:componentId",pvc.updateForCde);

module.exports = router;