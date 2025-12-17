const bankstmt = require('../controllers/data_entry/bankstmt.controller');
const express = require('express');
const router = express.Router();

router.post("/",bankstmt.create);
router.get("/:case",bankstmt.findAllForACase);
router.get("/findone/:caseId/:componentId",bankstmt.findOne);
router.post("/uploadfile",bankstmt.uploadFile);
router.post("/uploadproofofwork",bankstmt.uploadProofOfWork);
router.post("/uploadpvproofofwork",bankstmt.uploadPvProofOfWork);
router.post("/uploadpaymentproof",bankstmt.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",bankstmt.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",bankstmt.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",bankstmt.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",bankstmt.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",bankstmt.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",bankstmt.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",bankstmt.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",bankstmt.readPaymentProofs);
router.put("/:caseId/:componentId",bankstmt.update);
router.put("/updatedataentrystatus/:caseId/:componentId",bankstmt.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",bankstmt.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",bankstmt.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",bankstmt.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",bankstmt.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",bankstmt.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",bankstmt.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",bankstmt.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",bankstmt.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",bankstmt.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",bankstmt.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",bankstmt.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",bankstmt.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",bankstmt.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",bankstmt.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",bankstmt.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",bankstmt.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",bankstmt.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",bankstmt.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",bankstmt.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",bankstmt.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",bankstmt.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",bankstmt.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",bankstmt.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",bankstmt.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",bankstmt.addNote);
router.get("/findcomponentsfor/:for",bankstmt.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",bankstmt.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",bankstmt.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",bankstmt.reinitiateCheck);
router.get("/insuff/searchacaseininsuffforclient",bankstmt.searchACaseForInsuffForClient);
router.get("/",bankstmt.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
