const physicalVerificationEmployment = require('../controllers/data_entry/physical_verification_employment.controller');
const express = require('express');
const router = express.Router();

router.post("/",physicalVerificationEmployment.create);
router.get("/case/:case/componentname/:componentName/componentid/:componentId",physicalVerificationEmployment.readAllForAComponent);
router.get("/readallfor/:for",physicalVerificationEmployment.readAllFor);
router.put("/updatefeverificationstatus/:_id",physicalVerificationEmployment.updateFeVerificationStatus);
router.put("/updateanalystverificationstatus/:_id",physicalVerificationEmployment.updateAnalystVerificationStatus);
router.get("/:_id",physicalVerificationEmployment.read);
module.exports = router;