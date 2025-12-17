const branch = require('../controllers/masters/branch.controller');
const express = require('express');
const router = express.Router();

router.post("/",branch.create);
router.get("/",branch.findAll);
router.get("/:_id",branch.findOne);
router.put("/:_id",branch.update);
router.delete("/:_id",branch.delete);
router.get("/getbranchforpin/:pin",branch.getABranchForPin);
module.exports = router;