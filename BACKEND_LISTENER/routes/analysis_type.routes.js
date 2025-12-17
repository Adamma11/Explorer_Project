const analysisType = require('../controllers/masters/analysis_type.controller')
const express = require('express');
const router = express.Router();

router.post("/",analysisType.create);
router.put("/:_id",analysisType.update);
router.get("/",analysisType.readAll);
router.get("/:_id",analysisType.read);
router.delete("/:_id",analysisType.delete);
module.exports = router;

