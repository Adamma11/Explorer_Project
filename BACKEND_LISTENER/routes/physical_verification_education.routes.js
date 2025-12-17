const physicalVerificationEducation = require('../controllers/data_entry/physical_verification_education.controller');
const express = require('express');
const router = express.Router();

router.post("/",physicalVerificationEducation.create);
router.get("/case/:case/componentname/:componentName/componentid/:componentId",physicalVerificationEducation.readAllForAComponent);
router.get("/readallfor/:for",physicalVerificationEducation.readAllFor);
router.put("/updatefeverificationstatus/:_id",physicalVerificationEducation.updateFeVerificationStatus);
router.put("/updateanalystverificationstatus/:_id",physicalVerificationEducation.updateAnalystVerificationStatus);
router.get("/:_id",physicalVerificationEducation.read);
module.exports = router;