const allComponents = require('../controllers/data_entry/all_components_new.controller');
const express = require('express');
const router = express.Router();
const fs = require('fs');
//router.get("/findallinsufficienciesforscrutiny",allComponents.findAllInsufficiencesForScrutiny);
//router.get("/findallinsufficienciesforclient",allComponents.findAllInsufficiencesForClient);
router.get("/sendMailFollowUp/:compName",allComponents.sendMailForNextFollowUpdate);
router.get("/findchecksforvendor",allComponents.getAllChecksForAVendor)
//router.get("/detailsforreport/:case_id",allComponents.getDetailsForFinalReport)
router.post("/casestatusreport",allComponents.getDetailsForCaseStatusReport)
router.post("/uploadfile",allComponents.uploadCDF);
router.post("/insuffRaised/:caseId",allComponents.insuffRaised);
router.get("/createimageforreport/:case_id",allComponents.convertPdfsToImagesForAGivenCase)
router.put("/updatecasestatus/:case_id",allComponents.updateStatusForAGivenCase)
router.get('/getcasesinoutputqc',allComponents.getCasesInOutputqc)
router.put('/createjpgs/:check_id',allComponents.createJpgs)
router.get('/exportComponentData',allComponents.exportComponentData)
router.get('/allComponentDataforACase/:case_id', allComponents.allComponentDataforACase)
router.delete('/deleteCheck/:component_id/:check_id', allComponents.deleteCheck)
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",allComponents.downloadProofOfWork);
router.post("/uploadproofofwork",allComponents.uploadProofOfWork);
router.post("/uploadcandidatedocs",allComponents.uploadCandidateDocs);
router.delete("/deleteproofofwork/:caseId/:componentName/:check_id",allComponents.deleteProofOfWork)
router.delete("/deletecandidatedocs/:caseId/:componentName/:check_id",allComponents.deleteCandidateDocs)
router.get("/downloadCanDox/:caseId/:componentName/:componentId",allComponents.downloadCanDox);
router.get("/downloadcdf/:caseId",allComponents.downloadcdf);
router.post("/stopcheck",allComponents.stopComponentCheck)
router.post('/employmentInfo',allComponents.getCompanyNameOfEmployee)
router.get(`/findcomponentsfor/:component/:for`, allComponents.findComponentsFor); 
//Analyst Dashboard
router.get("/countOfWIPChecksForAnalyst", allComponents.countOfWIPChecksForAnalyst)
router.get("/countOfRejectedChecksForAnalyst", allComponents.countOfRejectedChecksForAnalyst)
router.get("/countOfClosedChecksForTheMonth", allComponents.countOfClosedChecksForTheMonth)
router.get("/countOfInsuffClearedChecksForAnalyst", allComponents.countOfInsuffClearedChecksForAnalyst)
router.get("/getPendingAndClosedCountForAnalystPerDay", allComponents.getPendingAndClosedCountForAnalystPerDay)
router.get('/getNoOfEffortsOnTodayForAnalyst',allComponents.getNoOfEffortsOnTodayForAnalyst);
router.get('/getNoOfEffortsPerDayForAnalyst',allComponents.getNoOfEffortsPerDayForAnalyst);
router.post("/unallocated/verification/",allComponents.findAllUnallocatedComponentsForUser)
router.post("/user/getallchecksallocatedtomeforverificationmulti",allComponents.getAllChecksAllocatedToMeForVerificationMulti);
router.post("/uploadfile-allcomponents",allComponents.uploadFile);
router.delete("/deletefile-allcomponents/:caseId/:componentName/:componentId/:fileName",allComponents.deleteFile);


router.post("/insuffMail/:caseId",allComponents.insuffRaised);
router.put("/addnotes/:caseId/:componentId",allComponents.addNote);

router.delete("/deletecdf/:caseId", allComponents.deleteCDF);
router.post("/uploadcdf", allComponents.uploadCDF);


module.exports = router;
