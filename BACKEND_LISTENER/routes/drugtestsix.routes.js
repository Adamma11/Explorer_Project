const drugtestsix = require('../controllers/data_entry/drugtestsix.controller');
const express = require('express');
const router = express.Router();

router.post("/",drugtestsix.create);
router.get("/:case",drugtestsix.findAllForACase);
router.get("/findone/:caseId/:componentId",drugtestsix.findOne);
router.post("/uploadfile",drugtestsix.uploadFile);
router.post("/uploadproofofwork",drugtestsix.uploadProofOfWork);
router.post("/uploadpvproofofwork",drugtestsix.uploadPvProofOfWork);
router.post("/uploadpaymentproof",drugtestsix.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",drugtestsix.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",drugtestsix.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",drugtestsix.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",drugtestsix.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",drugtestsix.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",drugtestsix.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",drugtestsix.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",drugtestsix.readPaymentProofs);
router.put("/:caseId/:componentId",drugtestsix.update);
router.put("/updatedataentrystatus/:caseId/:componentId",drugtestsix.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",drugtestsix.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",drugtestsix.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",drugtestsix.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",drugtestsix.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",drugtestsix.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",drugtestsix.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",drugtestsix.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",drugtestsix.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",drugtestsix.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",drugtestsix.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",drugtestsix.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",drugtestsix.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",drugtestsix.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",drugtestsix.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",drugtestsix.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",drugtestsix.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",drugtestsix.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",drugtestsix.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",drugtestsix.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",drugtestsix.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",drugtestsix.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",drugtestsix.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",drugtestsix.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",drugtestsix.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",drugtestsix.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",drugtestsix.addNote);
router.get("/findcomponentsfor/:for",drugtestsix.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",drugtestsix.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",drugtestsix.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",drugtestsix.reinitiateCheck);
router.get("/",drugtestsix.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
