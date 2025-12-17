const colorblindness = require('../controllers/data_entry/colorblindness.controller');
const express = require('express');
const router = express.Router();

router.post("/",colorblindness.create);
router.get("/:case",colorblindness.findAllForACase);
router.get("/findone/:caseId/:componentId",colorblindness.findOne);
router.post("/uploadfile",colorblindness.uploadFile);
router.post("/uploadproofofwork",colorblindness.uploadProofOfWork);
router.post("/uploadpvproofofwork",colorblindness.uploadPvProofOfWork);
router.post("/uploadpaymentproof",colorblindness.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",colorblindness.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",colorblindness.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",colorblindness.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",colorblindness.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",colorblindness.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",colorblindness.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",colorblindness.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",colorblindness.readPaymentProofs);
router.put("/:caseId/:componentId",colorblindness.update);
router.put("/updatedataentrystatus/:caseId/:componentId",colorblindness.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",colorblindness.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",colorblindness.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",colorblindness.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",colorblindness.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",colorblindness.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",colorblindness.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",colorblindness.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",colorblindness.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",colorblindness.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",colorblindness.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",colorblindness.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",colorblindness.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",colorblindness.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",colorblindness.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",colorblindness.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",colorblindness.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",colorblindness.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",colorblindness.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",colorblindness.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",colorblindness.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",colorblindness.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",colorblindness.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",colorblindness.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",colorblindness.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",colorblindness.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",colorblindness.addNote);
router.get("/findcomponentsfor/:for",colorblindness.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",colorblindness.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",colorblindness.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",colorblindness.reinitiateCheck);
router.get("/",colorblindness.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
