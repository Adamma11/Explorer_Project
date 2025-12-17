
const facis = require('../controllers/data_entry/facis.controller');
const express = require('express');
const router = express.Router();

router.post("/",facis.createForCde);
router.get("/findone/:caseId/:serialNumber",facis.findOneForCde);
router.post("/uploadfile",facis.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",facis.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",facis.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",facis.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",facis.readFileNamesForCde);
router.put("/:caseId/:componentId",facis.updateForCde);

module.exports = router;