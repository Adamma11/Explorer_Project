const courierDetailsEducation = require('../controllers/data_entry/courier_details_education.controller');
const express = require('express');
const router = express.Router();

router.post("/",courierDetailsEducation.create);
router.get("/case/:case/componentname/:componentName/componentid/:componentId",courierDetailsEducation.readAllForAComponent);
module.exports = router;