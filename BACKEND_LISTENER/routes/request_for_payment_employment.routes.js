const requestForPaymentEmployment = require('../controllers/data_entry/request_for_payment_employment.controller');
const express = require('express');
const router = express.Router();

router.post("/",requestForPaymentEmployment.create);
router.put("/:_id",requestForPaymentEmployment.updatePaymentReferenceNumber);
router.get("/case/:case/componentname/:componentName/componentid/:componentId",requestForPaymentEmployment.readAllForAComponent);
router.get("/readallwithstatus/:status",requestForPaymentEmployment.readAllWithStatus)
router.get("/component/:_id",requestForPaymentEmployment.readASingleComponent)
module.exports = router;