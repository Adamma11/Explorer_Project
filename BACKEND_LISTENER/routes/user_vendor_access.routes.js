const userVendorAccess = require('../controllers/administration/user_vendor_access.controller');
const express = require('express');
const router = express.Router();

router.post("/",userVendorAccess.createMany);
router.get("/:userId",userVendorAccess.findAllVendorsForAUser);
router.delete("/:userId",userVendorAccess.deleteAllVendorsForAUser);
module.exports = router;