const defaultCalendar = require('../controllers/administration/default_calendar.controller');
const express = require('express');
const router = express.Router();

router.get('/upcomingHoliday',defaultCalendar.getUpcomingHoliday)
router.post("/",defaultCalendar.create);
router.put("/:_id",defaultCalendar.update);
router.get("/upcomming",defaultCalendar.readUpcomingHoliday);
router.get("/:year",defaultCalendar.readAllForYear);
router.delete("/:_id",defaultCalendar.delete);
module.exports = router;
