const empadvance = require('../controllers/data_entry/empadvance.controller');
const express = require('express');
const router = express.Router();

router.post("/",empadvance.create);
router.get("/:case",empadvance.findAllForACase);
router.get("/findone/:caseId/:componentId",empadvance.findOne);
router.post("/uploadfile",empadvance.uploadFile);
router.post("/uploadproofofwork",empadvance.uploadProofOfWork);
router.post("/uploadpvproofofwork",empadvance.uploadPvProofOfWork);
router.post("/uploadpaymentproof",empadvance.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",empadvance.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",empadvance.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",empadvance.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",empadvance.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",empadvance.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",empadvance.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",empadvance.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",empadvance.readPaymentProofs);
router.put("/:caseId/:componentId",empadvance.update);
router.put("/updatedataentrystatus/:caseId/:componentId",empadvance.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",empadvance.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",empadvance.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",empadvance.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",empadvance.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",empadvance.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",empadvance.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",empadvance.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",empadvance.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",empadvance.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",empadvance.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",empadvance.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",empadvance.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",empadvance.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",empadvance.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",empadvance.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",empadvance.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",empadvance.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",empadvance.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",empadvance.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",empadvance.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",empadvance.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",empadvance.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",empadvance.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",empadvance.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",empadvance.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",empadvance.addNote);
router.get("/findcomponentsfor/:for",empadvance.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",empadvance.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",empadvance.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",empadvance.reinitiateCheck);
router.get("/",empadvance.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
