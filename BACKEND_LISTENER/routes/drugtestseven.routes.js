const drugtestseven = require('../controllers/data_entry/drugtestseven.controller');
const express = require('express');
const router = express.Router();

router.post("/",drugtestseven.create);
router.get("/:case",drugtestseven.findAllForACase);
router.get("/findone/:caseId/:componentId",drugtestseven.findOne);
router.post("/uploadfile",drugtestseven.uploadFile);
router.post("/uploadproofofwork",drugtestseven.uploadProofOfWork);
router.post("/uploadpvproofofwork",drugtestseven.uploadPvProofOfWork);
router.post("/uploadpaymentproof",drugtestseven.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",drugtestseven.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",drugtestseven.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",drugtestseven.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",drugtestseven.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",drugtestseven.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",drugtestseven.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",drugtestseven.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",drugtestseven.readPaymentProofs);
router.put("/:caseId/:componentId",drugtestseven.update);
router.put("/updatedataentrystatus/:caseId/:componentId",drugtestseven.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",drugtestseven.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",drugtestseven.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",drugtestseven.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",drugtestseven.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",drugtestseven.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",drugtestseven.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",drugtestseven.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",drugtestseven.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",drugtestseven.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",drugtestseven.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",drugtestseven.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",drugtestseven.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",drugtestseven.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",drugtestseven.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",drugtestseven.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",drugtestseven.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",drugtestseven.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",drugtestseven.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",drugtestseven.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",drugtestseven.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",drugtestseven.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",drugtestseven.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",drugtestseven.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",drugtestseven.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",drugtestseven.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",drugtestseven.addNote);
router.get("/findcomponentsfor/:for",drugtestseven.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",drugtestseven.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",drugtestseven.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",drugtestseven.reinitiateCheck);
router.get("/",drugtestseven.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
