const tlTracker = require('../controllers/reports/tl_tracker_main.controller');
const analystTracker = require('../controllers/reports/analyst_tracker.controller');
const caseStatusReport = require('../controllers/reports/case_status.controller')
const stdWordReport = require('../controllers/reports/std_word_report_main.controller')
const cgWordReport = require('../controllers/reports/cg_word_report_main.controller')
const tcsWordReport = require("../controllers/reports/tcs_word_report_main.controller")
const updateCaseInsuffDates = require('../controllers/reports/update_case_insuff_dates.controller')
const caseFlowReport = require('../controllers/reports/case_flow_report_new.controller')
const vendorTracker = require('../controllers/reports/vendor_tracker.controller')
const deStatusReport = require('../controllers/reports/de_status.controller')
const operationStats = require('../controllers/reports/operation_stats.controller')
const billingTracker = require('../controllers/reports/billing_tracker.controller')
const insuffClientTracker = require('../controllers/reports/insuff_client_tracker.controller')
const casesWithoutOutputqcDate = require('../controllers/reports/cases_without_outputqc_date.controller')
const operationStatsForAnalyst = require('../controllers/reports/operation_stats_for_analyst.controller')
const convertToJpgs = require('../controllers/reports/convert_to_jpgs.controller')
const deleteJpegs = require('../controllers/reports/delete_jpegs.controller')
const finalReport = require('../controllers/reports/final_report.controller')
const express = require('express');
const router = express.Router();

//router.get("/tlreport",tlTracker.getTLTrackerReport);
//router.get("/analysttracker",analystTracker.getAnalystTrackerReport);
//router.get("/casestatusreport/:client_id",caseStatusReport.getCaseStatusReport);
//router.get("/standardwordreport/:caseId",stdWordReport.standardWordReport)
//router.get("/cgwordreport/:caseId",cgWordReport.capgeminiWordReport)
//router.get("/tcswordreport/:caseId",tcsWordReport.tcsWordReport)
//router.get("/updatecaseinsuffdates",updateCaseInsuffDates.updateCaseStatus)
//router.get("/caseflowreport",caseFlowReport.getCaseFlowReport)
//router.get("/vendortracker",vendorTracker.getVendorTrackerReport)
//router.get("/destatusreport",deStatusReport.getDataEntryStatusReport)
router.get("/operationstats",operationStats.getOperationStats)
//router.get("/billingtracker",billingTracker.getBillingTracker)
//router.get("/insuffclienttracker",insuffClientTracker.getInsuffForClientReport)
router.get("/operationstatsforanalyst",operationStatsForAnalyst.getOperationStatsForAnalyst)
router.get("/caseswithoutoutputqcdate",casesWithoutOutputqcDate.getCasesWithoutOutputqcDate)
//06-jan-23
router.get("/downloadFinalReportPDF/:caseId", finalReport.downloadFinalReportPDF)
//06-jan-23
//router.get("/convertpdfsttojpgs/:caseId",convertToJpgs.convertPdfsToJpgs)
//router.put("/deletejpegs/:caseId",deleteJpegs.deleteAllJpegs)
module.exports = router;
