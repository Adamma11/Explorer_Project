const drugtestten = require('../controllers/data_entry/drugtestten.controller');
const express = require('express');
const router = express.Router();

router.post("/",drugtestten.create);
router.get("/:case",drugtestten.findAllForACase);
router.get("/findone/:caseId/:componentId",drugtestten.findOne);
router.post("/uploadfile",drugtestten.uploadFile);
router.post("/uploadproofofwork",drugtestten.uploadProofOfWork);
router.post("/uploadpvproofofwork",drugtestten.uploadPvProofOfWork);
router.post("/uploadpaymentproof",drugtestten.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",drugtestten.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",drugtestten.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",drugtestten.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",drugtestten.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",drugtestten.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",drugtestten.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",drugtestten.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",drugtestten.readPaymentProofs);
router.put("/:caseId/:componentId",drugtestten.update);
router.put("/updatedataentrystatus/:caseId/:componentId",drugtestten.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",drugtestten.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",drugtestten.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",drugtestten.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",drugtestten.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",drugtestten.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",drugtestten.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",drugtestten.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",drugtestten.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",drugtestten.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",drugtestten.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",drugtestten.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",drugtestten.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",drugtestten.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",drugtestten.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",drugtestten.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",drugtestten.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",drugtestten.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",drugtestten.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",drugtestten.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",drugtestten.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",drugtestten.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",drugtestten.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",drugtestten.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",drugtestten.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",drugtestten.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",drugtestten.addNote);
router.get("/findcomponentsfor/:for",drugtestten.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",drugtestten.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",drugtestten.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",drugtestten.reinitiateCheck);
router.get("/",drugtestten.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
