const analysisCode = require('../controllers/masters/analysis_code.controller')
const express = require('express');
const router = express.Router();

router.post("/",analysisCode.create);
router.put("/:analysisType/:_id",analysisCode.update);
router.get("/:analysisType",analysisCode.readAll);
router.get("/:analysisType/:_id",analysisCode.read);
router.delete("/analysisType/:_id",analysisCode.delete);
module.exports = router;

