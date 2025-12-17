
const additionalidb = require('../controllers/data_entry/additionalidb.controller');
const express = require('express');
const router = express.Router();

router.post("/",additionalidb.createForCde);
router.get("/findone/:caseId/:serialNumber",additionalidb.findOneForCde);
router.post("/uploadfile",additionalidb.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",additionalidb.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",additionalidb.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",additionalidb.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",additionalidb.readFileNamesForCde);
router.put("/:caseId/:componentId",additionalidb.updateForCde);

module.exports = router;