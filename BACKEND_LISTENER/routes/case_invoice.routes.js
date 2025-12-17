const caseInvoice = require('../controllers/uploads/case_invoice.controller');
const express = require('express');
const router = express.Router();

router.post("/",caseInvoice.updateInvoiceAmounts);
module.exports = router;

