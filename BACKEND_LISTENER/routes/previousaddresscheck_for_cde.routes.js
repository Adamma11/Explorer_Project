
const previousaddresscheck = require('../controllers/data_entry/previousaddresscheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",previousaddresscheck.createForCde);
router.get("/findone/:caseId/:serialNumber",previousaddresscheck.findOneForCde);
router.post("/uploadfile",previousaddresscheck.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",previousaddresscheck.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",previousaddresscheck.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",previousaddresscheck.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",previousaddresscheck.readFileNamesForCde);
router.put("/:caseId/:componentId",previousaddresscheck.updateForCde);

module.exports = router;