
const fca = require('../controllers/data_entry/fca.controller');
const express = require('express');
const router = express.Router();

router.post("/",fca.createForCde);
router.get("/findone/:caseId/:serialNumber",fca.findOneForCde);
router.post("/uploadfile",fca.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",fca.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",fca.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",fca.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",fca.readFileNamesForCde);
router.put("/:caseId/:componentId",fca.updateForCde);

module.exports = router;