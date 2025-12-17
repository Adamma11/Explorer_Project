const addresstelephone = require('../controllers/data_entry/addresstelephone.controller');
const express = require('express');
const router = express.Router();

router.post("/",addresstelephone.create);
router.get("/:case",addresstelephone.findAllForACase);
router.get("/findone/:caseId/:componentId",addresstelephone.findOne);
router.post("/uploadfile",addresstelephone.uploadFile);
router.post("/uploadproofofwork",addresstelephone.uploadProofOfWork);
router.post("/uploadpvproofofwork",addresstelephone.uploadPvProofOfWork);
router.post("/uploadpaymentproof",addresstelephone.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",addresstelephone.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",addresstelephone.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",addresstelephone.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",addresstelephone.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",addresstelephone.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",addresstelephone.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",addresstelephone.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",addresstelephone.readPaymentProofs);
router.put("/:caseId/:componentId",addresstelephone.update);
router.put("/updatedataentrystatus/:caseId/:componentId",addresstelephone.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",addresstelephone.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",addresstelephone.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",addresstelephone.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",addresstelephone.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",addresstelephone.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",addresstelephone.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",addresstelephone.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",addresstelephone.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",addresstelephone.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",addresstelephone.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",addresstelephone.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",addresstelephone.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",addresstelephone.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",addresstelephone.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",addresstelephone.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",addresstelephone.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",addresstelephone.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",addresstelephone.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",addresstelephone.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",addresstelephone.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",addresstelephone.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",addresstelephone.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",addresstelephone.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",addresstelephone.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",addresstelephone.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",addresstelephone.addNote);
router.get("/findcomponentsfor/:for",addresstelephone.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",addresstelephone.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",addresstelephone.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",addresstelephone.reinitiateCheck);
router.get("/",addresstelephone.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
