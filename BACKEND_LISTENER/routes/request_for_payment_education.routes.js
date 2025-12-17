const requestForPaymentEducation = require('../controllers/data_entry/request_for_payment_education.controller');
const express = require('express');
const router = express.Router();

router.post("/",requestForPaymentEducation.create);
router.put("/:_id",requestForPaymentEducation.updatePaymentReferenceNumber);
router.get("/case/:case/componentname/:componentName/componentid/:componentId",requestForPaymentEducation.readAllForAComponent);
router.get("/readallwithstatus/:status",requestForPaymentEducation.readAllWithStatus)
router.get("/component/:_id",requestForPaymentEducation.readASingleComponent)
module.exports = router;