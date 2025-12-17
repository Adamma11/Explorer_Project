const courierDetailsEmployment = require('../controllers/data_entry/courier_details_employment.controller');
const express = require('express');
const router = express.Router();

router.post("/",courierDetailsEmployment.create);
router.get("/case/:case/componentname/:componentName/componentid/:componentId",courierDetailsEmployment.readAllForAComponent);
module.exports = router;