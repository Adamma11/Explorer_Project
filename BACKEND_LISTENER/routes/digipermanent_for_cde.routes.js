
const digipermanent = require('../controllers/data_entry/digipermanent.controller');
const express = require('express');
const router = express.Router();

router.post("/",digipermanent.createForCde);
router.get("/findone/:caseId/:serialNumber",digipermanent.findOneForCde);
router.post("/uploadfile",digipermanent.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",digipermanent.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",digipermanent.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",digipermanent.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",digipermanent.readFileNamesForCde);
router.put("/:caseId/:componentId",digipermanent.updateForCde);

module.exports = router;