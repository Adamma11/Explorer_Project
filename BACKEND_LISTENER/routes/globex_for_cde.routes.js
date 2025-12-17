
const globex = require('../controllers/data_entry/globex.controller');
const express = require('express');
const router = express.Router();

router.post("/",globex.createForCde);
router.get("/findone/:caseId/:serialNumber",globex.findOneForCde);
router.post("/uploadfile",globex.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",globex.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",globex.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",globex.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",globex.readFileNamesForCde);
router.put("/:caseId/:componentId",globex.updateForCde);

module.exports = router;