const commonController = require('../controllers/data_entry/common.controller');
const express = require('express');
const router = express.Router();

router.post("/uploadEmailAttachments",commonController.uploadEmailAttachments);
router.get("/readEmailAttachments/:caseId/:componentName/:componentId",commonController.readProofOfWorks);
router.get("/downloadEmailAttachment/:caseId/:componentName/:componentId",commonController.downloadEmailAttachments);
router.get("/getToAndCCMailAddresses",commonController.getToAndCCMailAddresses)

module.exports = router
