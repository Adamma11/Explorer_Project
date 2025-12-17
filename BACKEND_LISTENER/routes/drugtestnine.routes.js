const drugtestnine = require('../controllers/data_entry/drugtestnine.controller');
const express = require('express');
const router = express.Router();

router.post("/",drugtestnine.create);
router.get("/:case",drugtestnine.findAllForACase);
router.get("/findone/:caseId/:componentId",drugtestnine.findOne);
router.post("/uploadfile",drugtestnine.uploadFile);
router.post("/uploadproofofwork",drugtestnine.uploadProofOfWork);
router.post("/uploadpvproofofwork",drugtestnine.uploadPvProofOfWork);
router.post("/uploadpaymentproof",drugtestnine.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",drugtestnine.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",drugtestnine.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",drugtestnine.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",drugtestnine.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",drugtestnine.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",drugtestnine.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",drugtestnine.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",drugtestnine.readPaymentProofs);
router.put("/:caseId/:componentId",drugtestnine.update);
router.put("/updatedataentrystatus/:caseId/:componentId",drugtestnine.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",drugtestnine.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",drugtestnine.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",drugtestnine.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",drugtestnine.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",drugtestnine.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",drugtestnine.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",drugtestnine.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",drugtestnine.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",drugtestnine.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",drugtestnine.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",drugtestnine.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",drugtestnine.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",drugtestnine.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",drugtestnine.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",drugtestnine.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",drugtestnine.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",drugtestnine.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",drugtestnine.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",drugtestnine.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",drugtestnine.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",drugtestnine.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",drugtestnine.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",drugtestnine.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",drugtestnine.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",drugtestnine.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",drugtestnine.addNote);
router.get("/findcomponentsfor/:for",drugtestnine.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",drugtestnine.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",drugtestnine.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",drugtestnine.reinitiateCheck);
router.get("/",drugtestnine.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
