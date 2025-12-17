const userBranchAccess = require('../controllers/administration/user_branch_access.controller');
const express = require('express');
const router = express.Router();

router.post("/",userBranchAccess.createMany);
router.get("/user/:userId",userBranchAccess.findAllForAUser);
router.delete("/user/:userId",userBranchAccess.deleteForAUser);
module.exports = router;