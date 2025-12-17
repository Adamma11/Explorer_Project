const facisl3 = require('../controllers/data_entry/facisl3.controller');
const express = require('express');
const router = express.Router();

router.post("/",facisl3.create);
router.get("/:case",facisl3.findAllForACase);
router.get("/findone/:caseId/:componentId",facisl3.findOne);
router.post("/uploadfile",facisl3.uploadFile);
router.post("/uploadproofofwork",facisl3.uploadProofOfWork);
router.post("/uploadpvproofofwork",facisl3.uploadPvProofOfWork);
router.post("/uploadpaymentproof",facisl3.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",facisl3.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",facisl3.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",facisl3.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",facisl3.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",facisl3.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",facisl3.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",facisl3.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",facisl3.readPaymentProofs);
router.put("/:caseId/:componentId",facisl3.update);
router.put("/updatedataentrystatus/:caseId/:componentId",facisl3.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",facisl3.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",facisl3.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",facisl3.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",facisl3.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",facisl3.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",facisl3.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",facisl3.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",facisl3.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",facisl3.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",facisl3.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",facisl3.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",facisl3.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",facisl3.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",facisl3.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",facisl3.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",facisl3.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",facisl3.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",facisl3.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",facisl3.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",facisl3.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",facisl3.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",facisl3.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",facisl3.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",facisl3.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",facisl3.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",facisl3.addNote);
router.get("/findcomponentsfor/:for",facisl3.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",facisl3.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",facisl3.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",facisl3.reinitiateCheck);
router.get("/",facisl3.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
