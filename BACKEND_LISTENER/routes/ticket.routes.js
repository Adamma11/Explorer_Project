const ticket = require('../controllers/support/ticket.controller');
const express = require('express');
const router = express.Router();

router.post("/",ticket.create);
router.put("/:_id",ticket.update);
router.get("/:status",ticket.readAllOfStatus);
router.get("/ticket/:_id",ticket.read);
router.get("/",ticket.readAllTicketsRaisedByMe)
module.exports = router;
