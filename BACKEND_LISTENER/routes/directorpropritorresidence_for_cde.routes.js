
const directorpropritorresidence = require('../controllers/data_entry/directorpropritorresidence.controller');
const express = require('express');
const router = express.Router();

router.post("/",directorpropritorresidence.createForCde);
router.get("/findone/:caseId/:serialNumber",directorpropritorresidence.findOneForCde);
router.post("/uploadfile",directorpropritorresidence.uploadFileForCde);
router.delete("/deletefile/:caseId/:componentName/:componentId",directorpropritorresidence.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",directorpropritorresidence.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorpropritorresidence.downloadFileForCde);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorpropritorresidence.readFileNamesForCde);
router.put("/:caseId/:componentId",directorpropritorresidence.updateForCde);

module.exports = router;