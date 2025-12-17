
const ninepaneldrugtest = require('../controllers/data_entry/ninepaneldrugtest.controller');
const express = require('express');
const router = express.Router();


router.post("/",ninepaneldrugtest.create);
router.get("/:case",ninepaneldrugtest.findAllForACase);
router.get("/findone/:caseId/:componentId",ninepaneldrugtest.findOne);
router.post("/uploadfile",ninepaneldrugtest.uploadFile);
router.post("/uploadproofofwork",ninepaneldrugtest.uploadProofOfWork);
router.post("/uploadpvproofofwork",ninepaneldrugtest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",ninepaneldrugtest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",ninepaneldrugtest.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",ninepaneldrugtest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",ninepaneldrugtest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",ninepaneldrugtest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",ninepaneldrugtest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",ninepaneldrugtest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",ninepaneldrugtest.readPaymentProofs);
router.put("/:caseId/:componentId",ninepaneldrugtest.update);
router.put("/updatedataentrystatus/:caseId/:componentId",ninepaneldrugtest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",ninepaneldrugtest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",ninepaneldrugtest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",ninepaneldrugtest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",ninepaneldrugtest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",ninepaneldrugtest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",ninepaneldrugtest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",ninepaneldrugtest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",ninepaneldrugtest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",ninepaneldrugtest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",ninepaneldrugtest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",ninepaneldrugtest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",ninepaneldrugtest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",ninepaneldrugtest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",ninepaneldrugtest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",ninepaneldrugtest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",ninepaneldrugtest.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",ninepaneldrugtest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",ninepaneldrugtest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",ninepaneldrugtest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",ninepaneldrugtest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",ninepaneldrugtest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",ninepaneldrugtest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",ninepaneldrugtest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",ninepaneldrugtest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",ninepaneldrugtest.addNote);
router.get("/findcomponentsfor/:for",ninepaneldrugtest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",ninepaneldrugtest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",ninepaneldrugtest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",ninepaneldrugtest.reinitiateCheck);
// router.get("/",ninepaneldrugtest.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", ninepaneldrugtest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", ninepaneldrugtest.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", ninepaneldrugtest.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", ninepaneldrugtest.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        