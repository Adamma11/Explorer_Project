const creditequifax = require('../controllers/data_entry/creditequifax.controller');
const express = require('express');
const router = express.Router();

router.post("/",creditequifax.create);
router.get("/:case",creditequifax.findAllForACase);
router.get("/findone/:caseId/:componentId",creditequifax.findOne);
router.post("/uploadfile",creditequifax.uploadFile);
router.post("/uploadproofofwork",creditequifax.uploadProofOfWork);
router.post("/uploadpvproofofwork",creditequifax.uploadPvProofOfWork);
router.post("/uploadpaymentproof",creditequifax.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",creditequifax.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",creditequifax.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",creditequifax.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",creditequifax.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",creditequifax.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",creditequifax.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",creditequifax.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",creditequifax.readPaymentProofs);
router.put("/:caseId/:componentId",creditequifax.update);
router.put("/updatedataentrystatus/:caseId/:componentId",creditequifax.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",creditequifax.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",creditequifax.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",creditequifax.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",creditequifax.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",creditequifax.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",creditequifax.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",creditequifax.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",creditequifax.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",creditequifax.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",creditequifax.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",creditequifax.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",creditequifax.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",creditequifax.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",creditequifax.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",creditequifax.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",creditequifax.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",creditequifax.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",creditequifax.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",creditequifax.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",creditequifax.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",creditequifax.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",creditequifax.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",creditequifax.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",creditequifax.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",creditequifax.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",creditequifax.addNote);
router.get("/findcomponentsfor/:for",creditequifax.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",creditequifax.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",creditequifax.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",creditequifax.reinitiateCheck);
router.get("/",creditequifax.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
