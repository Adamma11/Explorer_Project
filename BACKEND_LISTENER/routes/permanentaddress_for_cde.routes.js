
const permanentaddress = require('../controllers/data_entry/permanentaddress.controller');
const express = require('express');
const router = express.Router();

router.post("/",permanentaddress.createForCde);
router.get("/findone/:caseId/:serialNumber",permanentaddress.findOneForCde);
router.post("/uploadfile",permanentaddress.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",permanentaddress.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",permanentaddress.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",permanentaddress.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",permanentaddress.readFileNamesForCde);
router.put("/:caseId/:componentId",permanentaddress.updateForCde);

module.exports = router;