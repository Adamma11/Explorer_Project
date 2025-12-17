const meeting = require('../controllers/sales/meeting.controller');
const express = require('express');
const router = express.Router();

router.post("/",meeting.create);
router.put("/:_id",meeting.update);
router.put("/updatestatus/:_id",meeting.updateStatus);
router.get("/meeting/:_id",meeting.read);
router.get("/leadorprospect/:leadOrProspect",meeting.readAllForALeadOrProspect);
router.get("/bde",meeting.readPendingApprovalForBde);
router.get("/approver",meeting.readPendingApprovalForApprover);
router.delete("/:_id",meeting.delete);
module.exports = router;
