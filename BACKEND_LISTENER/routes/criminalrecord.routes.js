const criminalrecord = require('../controllers/data_entry/criminalrecord.controller');
const express = require('express');
const router = express.Router();

router.post("/",criminalrecord.create);
router.get("/:case",criminalrecord.findAllForACase);
router.get("/findone/:caseId/:componentId",criminalrecord.findOne);
router.post("/uploadfile",criminalrecord.uploadFile);
router.post("/uploadproofofwork",criminalrecord.uploadProofOfWork);
router.post("/uploadpvproofofwork",criminalrecord.uploadPvProofOfWork);
router.post("/uploadpaymentproof",criminalrecord.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",criminalrecord.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",criminalrecord.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalrecord.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",criminalrecord.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",criminalrecord.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalrecord.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",criminalrecord.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",criminalrecord.readPaymentProofs);
router.put("/:caseId/:componentId",criminalrecord.update);
router.put("/updatedataentrystatus/:caseId/:componentId",criminalrecord.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",criminalrecord.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",criminalrecord.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",criminalrecord.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",criminalrecord.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",criminalrecord.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",criminalrecord.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",criminalrecord.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",criminalrecord.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",criminalrecord.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",criminalrecord.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",criminalrecord.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",criminalrecord.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",criminalrecord.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",criminalrecord.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",criminalrecord.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",criminalrecord.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",criminalrecord.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",criminalrecord.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",criminalrecord.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",criminalrecord.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",criminalrecord.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",criminalrecord.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",criminalrecord.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",criminalrecord.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",criminalrecord.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",criminalrecord.addNote);
router.get("/findcomponentsfor/:for",criminalrecord.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",criminalrecord.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",criminalrecord.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",criminalrecord.reinitiateCheck);
router.get("/",criminalrecord.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
