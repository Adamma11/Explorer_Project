const ticketResponse = require('../controllers/support/ticket_response.controller')
const express = require('express');
const router = express.Router();

router.post("/",ticketResponse.create);
router.get("/:_id",ticketResponse.read);
router.get("/ticket/:ticketId",ticketResponse.readAllForATicket);
module.exports = router;
