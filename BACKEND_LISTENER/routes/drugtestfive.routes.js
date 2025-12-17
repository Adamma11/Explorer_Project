const drugtestfive = require('../controllers/data_entry/drugtestfive.controller');
const express = require('express');
const router = express.Router();

router.post("/",drugtestfive.create);
router.get("/:case",drugtestfive.findAllForACase);
router.get("/findone/:caseId/:componentId",drugtestfive.findOne);
router.post("/uploadfile",drugtestfive.uploadFile);
router.post("/uploadproofofwork",drugtestfive.uploadProofOfWork);
router.post("/uploadpvproofofwork",drugtestfive.uploadPvProofOfWork);
router.post("/uploadpaymentproof",drugtestfive.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",drugtestfive.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",drugtestfive.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",drugtestfive.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",drugtestfive.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",drugtestfive.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",drugtestfive.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",drugtestfive.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",drugtestfive.readPaymentProofs);
router.put("/:caseId/:componentId",drugtestfive.update);
router.put("/updatedataentrystatus/:caseId/:componentId",drugtestfive.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",drugtestfive.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",drugtestfive.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",drugtestfive.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",drugtestfive.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",drugtestfive.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",drugtestfive.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",drugtestfive.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",drugtestfive.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",drugtestfive.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",drugtestfive.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",drugtestfive.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",drugtestfive.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",drugtestfive.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",drugtestfive.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",drugtestfive.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",drugtestfive.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",drugtestfive.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",drugtestfive.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",drugtestfive.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",drugtestfive.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",drugtestfive.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",drugtestfive.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",drugtestfive.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",drugtestfive.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",drugtestfive.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",drugtestfive.addNote);
router.get("/findcomponentsfor/:for",drugtestfive.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",drugtestfive.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",drugtestfive.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",drugtestfive.reinitiateCheck);
router.get("/",drugtestfive.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
