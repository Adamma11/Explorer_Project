const vendor = require('../controllers/administration/vendor.controller');
const express = require('express');
const router = express.Router();

router.post("/",vendor.create);
router.get("/",vendor.findAll);
router.get("/othercomponent/:component_id",vendor.findAllVendorsForOtherComponent);
router.get("/addresscomponent",vendor.findAllVendorsForAddressComponent);
router.get("/educationcomponent",vendor.findAllVendorsForEducationComponent);
router.get("/employmentcomponent",vendor.findAllVendorsForEmploymentComponent);
router.get("/:_id",vendor.findOne);
router.put("/:_id",vendor.update);
router.delete("/:_id",vendor.delete);
module.exports = router;