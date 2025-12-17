
const passport = require('../controllers/data_entry/passport.controller');
const express = require('express');
const router = express.Router();

router.post("/",passport.createForCde);
router.get("/findone/:caseId/:serialNumber",passport.findOneForCde);
router.post("/uploadfile",passport.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",passport.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",passport.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",passport.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",passport.readFileNamesForCde);
router.put("/:caseId/:componentId",passport.updateForCde);

module.exports = router;