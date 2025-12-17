const educationadvanced = require('../controllers/data_entry/educationadvanced.controller');
const express = require('express');
const router = express.Router();

router.post("/",educationadvanced.create);
router.get("/:case",educationadvanced.findAllForACase);
router.get("/findone/:caseId/:componentId",educationadvanced.findOne);
router.post("/uploadfile",educationadvanced.uploadFile);
router.post("/uploadproofofwork",educationadvanced.uploadProofOfWork);
router.post("/uploadpvproofofwork",educationadvanced.uploadPvProofOfWork);
router.post("/uploadpaymentproof",educationadvanced.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",educationadvanced.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",educationadvanced.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",educationadvanced.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",educationadvanced.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",educationadvanced.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",educationadvanced.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",educationadvanced.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",educationadvanced.readPaymentProofs);
router.put("/:caseId/:componentId",educationadvanced.update);
router.put("/updatedataentrystatus/:caseId/:componentId",educationadvanced.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",educationadvanced.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",educationadvanced.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",educationadvanced.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",educationadvanced.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",educationadvanced.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",educationadvanced.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",educationadvanced.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",educationadvanced.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",educationadvanced.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",educationadvanced.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",educationadvanced.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",educationadvanced.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",educationadvanced.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",educationadvanced.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",educationadvanced.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",educationadvanced.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",educationadvanced.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",educationadvanced.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",educationadvanced.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",educationadvanced.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",educationadvanced.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",educationadvanced.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",educationadvanced.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",educationadvanced.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",educationadvanced.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",educationadvanced.addNote);
router.get("/findcomponentsfor/:for",educationadvanced.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",educationadvanced.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",educationadvanced.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",educationadvanced.reinitiateCheck);
router.get("/",educationadvanced.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
