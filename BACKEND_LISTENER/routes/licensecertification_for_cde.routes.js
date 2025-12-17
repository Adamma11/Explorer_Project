
const licensecertification = require('../controllers/data_entry/licensecertification.controller');
const express = require('express');
const router = express.Router();

router.post("/",licensecertification.createForCde);
router.get("/findone/:caseId/:serialNumber",licensecertification.findOneForCde);
router.post("/uploadfile",licensecertification.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",licensecertification.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",licensecertification.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",licensecertification.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",licensecertification.readFileNamesForCde);
router.put("/:caseId/:componentId",licensecertification.updateForCde);

module.exports = router;