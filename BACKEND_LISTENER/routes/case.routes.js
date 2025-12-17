const caseController = require('../controllers/uploads/case.controller');
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post("/",caseController.create);
router.post("/batchcase",caseController.createABatchCase);
router.post("/uploadBulkCaseInititaion", caseController.bulkUploadCaseInititaion);
router.post("/uploadBulk", caseController.bulkUpload);
router.post("/uploadBulk-crm", caseController.bulkUploadCRM);
router.post("/crmuploadBulk", caseController.bulkUploadCRM);
// updated-15sep25
router.post("/uploadFiles", caseController.uploadFiles)
// end
router.post("/uploadloa",caseController.uploadloa);
router.post("/initiatecdecase",caseController.initiateCdeCase)
router.get("/client/:clientId/subclient/:subclientId",caseController.findAllCasesForAClientAndSubclient);
router.get("/case/:_id",caseController.findACase);
router.get("/batch/:batch",caseController.findAllForABatch);
router.get("/findonedeunallocated",caseController.findOneDeUnAllocated);
router.get("/downloadcandidatefile/:caseId",caseController.downloadCaseFile);
//router.get("/downloadcasefileforcdf/case/:caseId",caseController.downloadCaseFileForCDF);
router.get("/status/:status",caseController.findCasesWithStatus);
router.get("/allcases/status/:status",caseController.findAllCasesWithStatus);
///new09Aug2025//
router.get("/allcases/finalqcstatus/:status",caseController.findAllCasesWithStatusForFinalQc);
// Added by Arjun on 23rd November 2022
router.get("/allcases/statusforme/:status",caseController.findAllCasesWithStatusForMe);
// End Added by Arjun on 23rd November 2022
router.get("/allcases/casesforinputqc/:status",caseController.findCasesForInputqc);
router.get("/cdecases/cdecompleted",caseController.findAllCasesWithStatusCdeCompleted);
router.get("/caseforreport/caseid/:caseId",caseController.findACaseForReport);
router.get("/pendingcases/:client_id",caseController.pendingCases);
router.get("/searchbyname/candidatename/:candidateName",caseController.searchByCandidateName);
router.get("/searchbycaseid/caseid/:caseId",caseController.searchByCaseId);
router.get("/searchbyemployeeId/employeeId/:employeeId",caseController.searchByEmpId);

router.get("/searchbycaseidnores/caseid/:caseId",caseController.searchByCaseIdWithNoRestrictions);
router.get("/searchbyinitiationdate/datefrom/:initiationDateFrom/dateto/:initiationDateTo/:client_id",caseController.searchByInitiationDate);
router.get("/searchbycompletiondate/datefrom/:completionDateFrom/dateto/:completionDateTo/:client_id",caseController.searchByCompletionDate);
router.put("/case/:_id",caseController.updateStatus);
router.post("/uploadexcelcase",caseController.uploadExcelCase);
router.put("/allocatetouser/:case_id",caseController.allocateCaseToUser)
router.put("/setoutputqcgrade/:case_id",caseController.setOutputqcGrade)
router.put("/addacheck/:_id",caseController.addACheck)
router.put("/updateinsuffraiseddate/:_id",caseController.updateInsuffRaisedDate)
router.put("/updateinsuffcleareddate/:_id",caseController.updateInsuffClearedDate)
router.post("/uploadpdfreport",caseController.uploadPdfReport)
router.get("/readreportfilenames/:caseId",caseController.readReportFileNames)
router.get("/downloadpdfreport",caseController.downloadPdfReport)
router.get("/casecount",caseController.countOfCasesBetweenDates)
router.get("/dashboard/deinitiated",caseController.getDataEntryNewInitiationsForDashBoard)
router.get("/dashboard/inputqcrejections",caseController.getInputqcRejectionsForDashBoard)
router.get("/dashboard/inputqcacceptance",caseController.getInputqcAcceptedForDashBoard)
router.get("/lastsixmonthscount",caseController.getLastSixMonthsCaseInitiated)
router.get("/getcdecaseswithstatusmailsent/clientid/:clientId/subclientid/:subclientId",caseController.getCasesWithStatusMailSent);
router.put("/resendmail/:caseId",caseController.resendMail)
// Added by Arjun on 22nd November 2022
router.put("/updateoutputqcallocation/:case_id",caseController.updateOutputqcAllocation)
// End Added by Arjun on 22nd November 2022
//archived route
router.get("/searchUnarchivedCases/datefrom/:completionDateFrom/dateto/:completionDateTo/:client_id", caseController.searchUnarchivedCases);
router.get("/searchByCaseIdUnarchived/caseid/:caseId", caseController.searchByCaseIdUnarchived);
//new 09-jan-23
router.get("/searchArchivedCaseByCaseId/caseid/:caseId", caseController.searchArchivedCaseByCaseId)
router.post("/addAComment", caseController.addAComment)
router.get("/getAllCommentsForACase/:case_id", caseController.getAllCommentsForACase)
router.get("/downloadfileloa/:caseId",caseController.downloadfileLOA);
//router.delete("/deleteCase/:case_id", caseController.deleteCase)
router.delete("/deleteCase/:case_id", caseController.deleteAllCases)

/////////////
router.get("/findcasewithuser/:status",caseController.findCasesWithUser);
router.post("/allocateDEOnCaseCreation/:case_id",caseController.allocateDEOnCaseCreation)
router.put("/updateTatEndDate", caseController.updateTatEndDate)
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",caseController.deleteProofOfWork);


// Update LHS BY Candidate
router.post("/generatePasswordAndSendEmailToCandidate/:case_id", caseController.generatePasswordAndSendEmailToCandidate)
router.get("/cdf/:caseId",caseController.readcdf);
//Added by venky 
router.delete("/cdf/:caseId",caseController.deletecdf);

router.post("/createFromApi", caseController.createFromApi)
/////////////////ADMIN DashBoard//////////////
router.get("/getCaseDataForDashboard", caseController.getCaseDataForDashboard)
router.get("/writeBranchCaseData", caseController.writeBranchCaseData)
router.get("/getBranchCaseData", caseController.getBranchCaseData)
router.get("/getCasesBreakdown", caseController.getCasesBreakdown)///
router.get("/getInflowsAndOutflowsPerDay", caseController.getInflowsAndOutflowsPerDay)
router.get("/writeCaseDataForDashboard", caseController.writeCaseDataForDashboard)
router.get("/pendingFrequencyBucket", caseController.pendingFrequencyBucket)
router.get("/writeWipSummary", caseController.writeWipSummary)
router.get("/getWipSummary", caseController.getWipSummary)
router.get("/getClientCasesBreakdown", caseController.getClientCasesBreakdown)
router.get("/getClientCaseDataForDashboard", caseController.getClientCaseDataForDashboard)
router.get("/getClientInflowsAndOutflowsPerDay", caseController.getClientInflowsAndOutflowsPerDay)
router.get("/clientPendingFrequencyBucket", caseController.clientPendingFrequencyBucket)
router.get("/getClientWipSummary", caseController.getClientWipSummary)
router.put("/tatupdate/:case_id",caseController.updateTat)
router.put("/caseDraft/:_id",caseController.updateDraft);
router.put("/returnToFinalQc",caseController.returnToFinalQc );

//Kynode//
router.get("/case/details/:_id",caseController.findCasesWithDetails);


//added code sep-19///
router.get("/tatstats", caseController.getTatStats);
router.get("/tatstats-trend", caseController.getTatStatsTrend);
//ended code sep-19

///added line-sep22
router.get("/dashboard/case-counts", caseController.getCaseCountsForDashboard);

router.get(
  "/dashboard/combined-count",
  caseController.getTotalCountForInitiatedDeallocatedRejected
);
router.post("/uploadModify",caseController.uploadModify);
router.post('/upload-quicknote-files', caseController.uploadQuickNoteFiles);

module.exports = router;

