
const socialmedia = require('../controllers/data_entry/socialmedia.controller');
const express = require('express');
const router = express.Router();

router.post("/",socialmedia.createForCde);
router.get("/findone/:caseId/:serialNumber",socialmedia.findOneForCde);
router.post("/uploadfile",socialmedia.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",socialmedia.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",socialmedia.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",socialmedia.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",socialmedia.readFileNamesForCde);
router.put("/:caseId/:componentId",socialmedia.updateForCde);

module.exports = router;