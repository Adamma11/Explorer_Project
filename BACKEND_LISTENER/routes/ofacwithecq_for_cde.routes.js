
const ofacwithecq = require('../controllers/data_entry/ofacwithecq.controller');
const express = require('express');
const router = express.Router();

router.post("/",ofacwithecq.createForCde);
router.get("/findone/:caseId/:serialNumber",ofacwithecq.findOneForCde);
router.post("/uploadfile",ofacwithecq.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",ofacwithecq.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",ofacwithecq.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",ofacwithecq.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",ofacwithecq.readFileNamesForCde);
router.put("/:caseId/:componentId",ofacwithecq.updateForCde);

module.exports = router;