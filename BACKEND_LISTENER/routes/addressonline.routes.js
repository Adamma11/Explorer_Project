const addressonline = require('../controllers/data_entry/addressonline.controller');
const express = require('express');
const router = express.Router();

router.post("/",addressonline.create);
router.get("/:case",addressonline.findAllForACase);
router.get("/findone/:caseId/:componentId",addressonline.findOne);
router.post("/uploadfile",addressonline.uploadFile);
router.post("/uploadproofofwork",addressonline.uploadProofOfWork);
router.post("/uploadpvproofofwork",addressonline.uploadPvProofOfWork);
router.post("/uploadpaymentproof",addressonline.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",addressonline.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",addressonline.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",addressonline.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",addressonline.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",addressonline.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",addressonline.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",addressonline.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",addressonline.readPaymentProofs);
router.put("/:caseId/:componentId",addressonline.update);
router.put("/updatedataentrystatus/:caseId/:componentId",addressonline.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",addressonline.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",addressonline.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",addressonline.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",addressonline.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",addressonline.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",addressonline.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",addressonline.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",addressonline.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",addressonline.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",addressonline.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",addressonline.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",addressonline.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",addressonline.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",addressonline.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",addressonline.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",addressonline.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",addressonline.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",addressonline.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",addressonline.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",addressonline.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",addressonline.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",addressonline.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",addressonline.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",addressonline.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",addressonline.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",addressonline.addNote);
router.get("/findcomponentsfor/:for",addressonline.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",addressonline.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",addressonline.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",addressonline.reinitiateCheck);
router.get("/",addressonline.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
