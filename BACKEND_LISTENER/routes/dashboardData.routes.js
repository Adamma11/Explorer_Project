const dashboardData = require('../controllers/support/dashboardData.controller');
const express = require('express');
const router = express.Router();


router.get("/clientDashboardCount",dashboardData.getClientDashboardData);
router.get("/analystDashboardCount",dashboardData.getAnalystDashboardData);
router.get("/tlDashboardDataCount",dashboardData.getTlDashboardData);
router.get("/qcDashboardDataCount",dashboardData.getQcDashboardData);
router.get("/inceptionDashboardDataCount",dashboardData.getInceptionDashboardData);
router.get("/case-history-notification",dashboardData.caseHistoryNotification);
router.get("/case-history/:caseId",dashboardData.caseHistoryById);
router.get("/final-data",dashboardData.finalMonthsCount);
router.post("/send-mail-crm-esc",dashboardData.sendEmail);
module.exports = router;
