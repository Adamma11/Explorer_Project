
const fda = require('../controllers/data_entry/fda.controller');
const express = require('express');
const router = express.Router();

router.post("/",fda.createForCde);
router.get("/findone/:caseId/:serialNumber",fda.findOneForCde);
router.post("/uploadfile",fda.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",fda.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",fda.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",fda.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",fda.readFileNamesForCde);
router.put("/:caseId/:componentId",fda.updateForCde);

module.exports = router;