const clientHoliday = require('../controllers/administration/client_holiday.controller');
const express = require('express');
const router = express.Router();

router.post("/",clientHoliday.createMany);
router.get("/",clientHoliday.findAll);
router.get("/:year",clientHoliday.findAllHolidaysForAnYear);
router.delete("/:year",clientHoliday.deleteForAnYear);
module.exports = router;