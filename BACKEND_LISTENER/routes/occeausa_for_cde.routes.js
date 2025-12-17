
const occeausa = require('../controllers/data_entry/occeausa.controller');
const express = require('express');
const router = express.Router();

router.post("/",occeausa.createForCde);
router.get("/findone/:caseId/:serialNumber",occeausa.findOneForCde);
router.post("/uploadfile",occeausa.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",occeausa.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",occeausa.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",occeausa.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",occeausa.readFileNamesForCde);
router.put("/:caseId/:componentId",occeausa.updateForCde);

module.exports = router;