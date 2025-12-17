
const oig = require('../controllers/data_entry/oig.controller');
const express = require('express');
const router = express.Router();

router.post("/",oig.createForCde);
router.get("/findone/:caseId/:serialNumber",oig.findOneForCde);
router.post("/uploadfile",oig.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",oig.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",oig.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",oig.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",oig.readFileNamesForCde);
router.put("/:caseId/:componentId",oig.updateForCde);

module.exports = router;