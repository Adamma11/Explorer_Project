const dashboardAccess = require('../controllers/administration/dashboard_access.controller')
const express = require('express');
const router = express.Router();

router.post("/",dashboardAccess.createMany)
router.get("/role/:role",dashboardAccess.readAllForARole)
router.delete("/role/:role",dashboardAccess.deleteAllForARole)
router.get("/user",dashboardAccess.readAllForTheUser)
module.exports = router;
