const followup = require('../controllers/sales/follow_up.controller');
const express = require('express');
const router = express.Router();

router.post("/",followup.create);
router.put("/:_id",followup.update);
router.get("/:leadOrProspect",followup.readAllForALeadOrProspect);
router.delete("/:_id",followup.delete);
module.exports = router;