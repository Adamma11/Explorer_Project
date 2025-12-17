
const companycreditcheck = require('../controllers/data_entry/companycreditcheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",companycreditcheck.createForCde);
router.get("/findone/:caseId/:serialNumber",companycreditcheck.findOneForCde);
router.post("/uploadfile",companycreditcheck.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",companycreditcheck.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",companycreditcheck.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",companycreditcheck.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",companycreditcheck.readFileNamesForCde);
router.put("/:caseId/:componentId",companycreditcheck.updateForCde);

module.exports = router;