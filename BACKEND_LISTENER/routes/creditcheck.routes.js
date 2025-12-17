
const creditcheck = require('../controllers/data_entry/creditcheck.controller');
const express = require('express');
const router = express.Router();


router.post("/",creditcheck.create);
router.get("/:case",creditcheck.findAllForACase);
router.get("/findone/:caseId/:componentId",creditcheck.findOne);
router.post("/uploadfile",creditcheck.uploadFile);
router.post("/uploadproofofwork",creditcheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",creditcheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",creditcheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",creditcheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",creditcheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",creditcheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",creditcheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",creditcheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",creditcheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",creditcheck.readPaymentProofs);
router.put("/:caseId/:componentId",creditcheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",creditcheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",creditcheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",creditcheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",creditcheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",creditcheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",creditcheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",creditcheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",creditcheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",creditcheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",creditcheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",creditcheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",creditcheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",creditcheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",creditcheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",creditcheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",creditcheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",creditcheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",creditcheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",creditcheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",creditcheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",creditcheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",creditcheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",creditcheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",creditcheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",creditcheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",creditcheck.addNote);
router.get("/findcomponentsfor/:for",creditcheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",creditcheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",creditcheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",creditcheck.reinitiateCheck);
// router.get("/",creditcheck.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", creditcheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", creditcheck.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", creditcheck.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", creditcheck.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        