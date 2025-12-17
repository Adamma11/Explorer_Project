
const mca = require('../controllers/data_entry/mca.controller');
const express = require('express');
const router = express.Router();

router.post("/",mca.createForCde);
router.get("/findone/:caseId/:serialNumber",mca.findOneForCde);
router.post("/uploadfile",mca.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",mca.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",mca.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",mca.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",mca.readFileNamesForCde);
router.put("/:caseId/:componentId",mca.updateForCde);

module.exports = router;