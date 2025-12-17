const vendorComponent = require('../controllers/administration/vendor_component.controller');
const express = require('express');
const router = express.Router();

router.post("/",vendorComponent.createMany);
router.get("/vendor/:vendorId",vendorComponent.findAllForAVendor);
router.get("/:vendorId/:componentId",vendorComponent.findOne);
router.put("/:vendorId/:componentId",vendorComponent.update);
//router.delete("/:vendorId/:componentId",vendorComponent.delete);
router.delete("/vendor/:vendorId",vendorComponent.deleteAllForAVendor);
module.exports = router;