const vendorContract = require('../controllers/administration/vendor_contract.controller');
const express = require('express');
const router = express.Router();

router.post("/",vendorContract.create);
router.get("/vendor/:vendorId",vendorContract.readAllForVendor);
router.get("/:_id",vendorContract.findOne);
router.put("/:_id",vendorContract.update);
router.delete("/:_id",vendorContract.delete);
module.exports = router;