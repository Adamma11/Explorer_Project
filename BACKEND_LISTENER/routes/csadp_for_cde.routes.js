
const csadp = require('../controllers/data_entry/csadp.controller');
const express = require('express');
const router = express.Router();

router.post("/",csadp.createForCde);
router.get("/findone/:caseId/:serialNumber",csadp.findOneForCde);
router.post("/uploadfile",csadp.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",csadp.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",csadp.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",csadp.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",csadp.readFileNamesForCde);
router.put("/:caseId/:componentId",csadp.updateForCde);

module.exports = router;