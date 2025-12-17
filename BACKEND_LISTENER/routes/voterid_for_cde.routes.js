
const voterid = require('../controllers/data_entry/voterid.controller');
const express = require('express');
const router = express.Router();

router.post("/",voterid.createForCde);
router.get("/findone/:caseId/:serialNumber",voterid.findOneForCde);
router.post("/uploadfile",voterid.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",voterid.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",voterid.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",voterid.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",voterid.readFileNamesForCde);
router.put("/:caseId/:componentId",voterid.updateForCde);

module.exports = router;