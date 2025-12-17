const voucher = require('../controllers/sales/voucher.controller');
const express = require('express');
const router = express.Router();

router.post("/",voucher.create);
router.put("/:_id",voucher.update);
router.get("/meeting/:meeting_id",voucher.readForMeeting);
module.exports = router;