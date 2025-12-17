
const bankruptcyandinsolvency = require('../controllers/data_entry/bankruptcyandinsolvency.controller');
const express = require('express');
const router = express.Router();


router.post("/",bankruptcyandinsolvency.create);
router.get("/:case",bankruptcyandinsolvency.findAllForACase);
router.get("/findone/:caseId/:componentId",bankruptcyandinsolvency.findOne);
router.post("/uploadfile",bankruptcyandinsolvency.uploadFile);
router.post("/uploadproofofwork",bankruptcyandinsolvency.uploadProofOfWork);
router.post("/uploadpvproofofwork",bankruptcyandinsolvency.uploadPvProofOfWork);
router.post("/uploadpaymentproof",bankruptcyandinsolvency.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",bankruptcyandinsolvency.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",bankruptcyandinsolvency.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",bankruptcyandinsolvency.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",bankruptcyandinsolvency.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",bankruptcyandinsolvency.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",bankruptcyandinsolvency.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",bankruptcyandinsolvency.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",bankruptcyandinsolvency.readPaymentProofs);
router.put("/:caseId/:componentId",bankruptcyandinsolvency.update);
router.put("/clearcostapproval/:caseId/:componentId",bankruptcyandinsolvency.clearCostApproval);
router.put("/updatedataentrystatus/:caseId/:componentId",bankruptcyandinsolvency.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",bankruptcyandinsolvency.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",bankruptcyandinsolvency.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",bankruptcyandinsolvency.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",bankruptcyandinsolvency.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",bankruptcyandinsolvency.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",bankruptcyandinsolvency.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",bankruptcyandinsolvency.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",bankruptcyandinsolvency.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",bankruptcyandinsolvency.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",bankruptcyandinsolvency.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",bankruptcyandinsolvency.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",bankruptcyandinsolvency.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",bankruptcyandinsolvency.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",bankruptcyandinsolvency.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",bankruptcyandinsolvency.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",bankruptcyandinsolvency.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",bankruptcyandinsolvency.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",bankruptcyandinsolvency.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",bankruptcyandinsolvency.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",bankruptcyandinsolvency.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",bankruptcyandinsolvency.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",bankruptcyandinsolvency.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",bankruptcyandinsolvency.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",bankruptcyandinsolvency.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",bankruptcyandinsolvency.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",bankruptcyandinsolvency.addNote);
router.get("/findcomponentsfor/:for",bankruptcyandinsolvency.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",bankruptcyandinsolvency.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",bankruptcyandinsolvency.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",bankruptcyandinsolvency.reinitiateCheck);
router.get("/",bankruptcyandinsolvency.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", bankruptcyandinsolvency.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", bankruptcyandinsolvency.getAllquicknoteForACheck)
module.exports = router;
        