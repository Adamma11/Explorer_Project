
const sdn = require('../controllers/data_entry/sdn.controller');
const express = require('express');
const router = express.Router();

router.post("/",sdn.createForCde);
router.get("/findone/:caseId/:serialNumber",sdn.findOneForCde);
router.post("/uploadfile",sdn.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",sdn.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",sdn.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",sdn.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",sdn.readFileNamesForCde);
router.put("/:caseId/:componentId",sdn.updateForCde);

module.exports = router;