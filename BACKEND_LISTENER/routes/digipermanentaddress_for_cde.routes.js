
const digipermanentaddress = require('../controllers/data_entry/digipermanentaddress.controller');
const express = require('express');
const router = express.Router();

router.post("/",digipermanentaddress.createForCde);
router.get("/findone/:caseId/:serialNumber",digipermanentaddress.findOneForCde);
router.post("/uploadfile",digipermanentaddress.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",digipermanentaddress.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",digipermanentaddress.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",digipermanentaddress.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",digipermanentaddress.readFileNamesForCde);
router.put("/:caseId/:componentId",digipermanentaddress.updateForCde);

module.exports = router;