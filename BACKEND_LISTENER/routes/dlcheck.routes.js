const dlcheck = require('../controllers/data_entry/dlcheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",dlcheck.create);
router.get("/:case",dlcheck.findAllForACase);
router.get("/findone/:caseId/:componentId",dlcheck.findOne);
router.post("/uploadfile",dlcheck.uploadFile);
router.post("/uploadproofofwork",dlcheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",dlcheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",dlcheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",dlcheck.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",dlcheck.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",dlcheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",dlcheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",dlcheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",dlcheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",dlcheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",dlcheck.readPaymentProofs);
router.put("/:caseId/:componentId",dlcheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",dlcheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",dlcheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",dlcheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",dlcheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",dlcheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",dlcheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",dlcheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",dlcheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",dlcheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",dlcheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",dlcheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",dlcheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",dlcheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",dlcheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",dlcheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",dlcheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",dlcheck.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",dlcheck.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",dlcheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",dlcheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",dlcheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",dlcheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",dlcheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",dlcheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",dlcheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",dlcheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",dlcheck.addNote);
router.get("/findcomponentsfor/:for",dlcheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",dlcheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",dlcheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",dlcheck.reinitiateCheck);
router.get("/",dlcheck.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
