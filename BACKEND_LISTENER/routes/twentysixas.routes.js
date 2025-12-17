const twentysixas = require('../controllers/data_entry/twentysixas.controller');
const express = require('express');
const router = express.Router();

router.post("/",twentysixas.create);
router.get("/:case",twentysixas.findAllForACase);
router.get("/findone/:caseId/:componentId",twentysixas.findOne);
router.post("/uploadfile",twentysixas.uploadFile);
router.post("/uploadproofofwork",twentysixas.uploadProofOfWork);
router.post("/uploadpvproofofwork",twentysixas.uploadPvProofOfWork);
router.post("/uploadpaymentproof",twentysixas.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",twentysixas.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",twentysixas.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",twentysixas.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",twentysixas.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",twentysixas.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",twentysixas.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",twentysixas.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",twentysixas.readPaymentProofs);
router.put("/:caseId/:componentId",twentysixas.update);
router.put("/updatedataentrystatus/:caseId/:componentId",twentysixas.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",twentysixas.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",twentysixas.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",twentysixas.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",twentysixas.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",twentysixas.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",twentysixas.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",twentysixas.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",twentysixas.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",twentysixas.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",twentysixas.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",twentysixas.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",twentysixas.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",twentysixas.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",twentysixas.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",twentysixas.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",twentysixas.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",twentysixas.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",twentysixas.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",twentysixas.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",twentysixas.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",twentysixas.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",twentysixas.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",twentysixas.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",twentysixas.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",twentysixas.addNote);
router.get("/findcomponentsfor/:for",twentysixas.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",twentysixas.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",twentysixas.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",twentysixas.reinitiateCheck);
router.get("/insuff/searchacaseininsuffforclient",twentysixas.searchACaseForInsuffForClient);
router.get("/",twentysixas.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
