const branchAccess = require('../controllers/administration/branch_access.controller');
const express = require('express');
const router = express.Router();

router.put("/:role",branchAccess.updateBranchAccessForARole);
router.get("/:role",branchAccess.readAllForARole);
module.exports = router;