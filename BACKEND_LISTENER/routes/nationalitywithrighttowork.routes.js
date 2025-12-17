
const nationalitywithrighttowork = require('../controllers/data_entry/nationalitywithrighttowork.controller');
const express = require('express');
const router = express.Router();


router.post("/",nationalitywithrighttowork.create);
router.get("/:case",nationalitywithrighttowork.findAllForACase);
router.get("/findone/:caseId/:componentId",nationalitywithrighttowork.findOne);
router.post("/uploadfile",nationalitywithrighttowork.uploadFile);
router.post("/uploadproofofwork",nationalitywithrighttowork.uploadProofOfWork);
router.post("/uploadpvproofofwork",nationalitywithrighttowork.uploadPvProofOfWork);
router.post("/uploadpaymentproof",nationalitywithrighttowork.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",nationalitywithrighttowork.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",nationalitywithrighttowork.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",nationalitywithrighttowork.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",nationalitywithrighttowork.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",nationalitywithrighttowork.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",nationalitywithrighttowork.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",nationalitywithrighttowork.readPaymentProofs);
router.put("/:caseId/:componentId",nationalitywithrighttowork.update);
router.put("/updatedataentrystatus/:caseId/:componentId",nationalitywithrighttowork.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",nationalitywithrighttowork.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",nationalitywithrighttowork.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",nationalitywithrighttowork.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",nationalitywithrighttowork.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",nationalitywithrighttowork.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",nationalitywithrighttowork.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",nationalitywithrighttowork.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",nationalitywithrighttowork.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",nationalitywithrighttowork.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",nationalitywithrighttowork.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",nationalitywithrighttowork.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",nationalitywithrighttowork.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",nationalitywithrighttowork.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",nationalitywithrighttowork.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",nationalitywithrighttowork.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",nationalitywithrighttowork.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",nationalitywithrighttowork.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",nationalitywithrighttowork.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",nationalitywithrighttowork.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",nationalitywithrighttowork.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",nationalitywithrighttowork.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",nationalitywithrighttowork.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",nationalitywithrighttowork.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",nationalitywithrighttowork.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",nationalitywithrighttowork.addNote);
router.get("/findcomponentsfor/:for",nationalitywithrighttowork.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",nationalitywithrighttowork.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",nationalitywithrighttowork.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",nationalitywithrighttowork.reinitiateCheck);
// router.get("/",nationalitywithrighttowork.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", nationalitywithrighttowork.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", nationalitywithrighttowork.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", nationalitywithrighttowork.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", nationalitywithrighttowork.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        