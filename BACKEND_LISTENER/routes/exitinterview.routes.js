const exitinterview = require('../controllers/data_entry/exitinterview.controller');
const express = require('express');
const router = express.Router();

router.post("/",exitinterview.create);
router.get("/:case",exitinterview.findAllForACase);
router.get("/findone/:caseId/:componentId",exitinterview.findOne);
router.post("/uploadfile",exitinterview.uploadFile);
router.post("/uploadproofofwork",exitinterview.uploadProofOfWork);
router.post("/uploadpvproofofwork",exitinterview.uploadPvProofOfWork);
router.post("/uploadpaymentproof",exitinterview.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",exitinterview.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",exitinterview.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",exitinterview.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",exitinterview.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",exitinterview.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",exitinterview.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",exitinterview.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",exitinterview.readPaymentProofs);
router.put("/:caseId/:componentId",exitinterview.update);
router.put("/updatedataentrystatus/:caseId/:componentId",exitinterview.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",exitinterview.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",exitinterview.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",exitinterview.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",exitinterview.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",exitinterview.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",exitinterview.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",exitinterview.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",exitinterview.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",exitinterview.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",exitinterview.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",exitinterview.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",exitinterview.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",exitinterview.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",exitinterview.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",exitinterview.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",exitinterview.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",exitinterview.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",exitinterview.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",exitinterview.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",exitinterview.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",exitinterview.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",exitinterview.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",exitinterview.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",exitinterview.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",exitinterview.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",exitinterview.addNote);
router.get("/findcomponentsfor/:for",exitinterview.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",exitinterview.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",exitinterview.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",exitinterview.reinitiateCheck);
router.get("/",exitinterview.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
