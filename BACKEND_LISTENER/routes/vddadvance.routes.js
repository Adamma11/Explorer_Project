const vddadvance = require('../controllers/data_entry/vddadvance.controller');
const express = require('express');
const router = express.Router();

router.post("/",vddadvance.create);
router.get("/:case",vddadvance.findAllForACase);
router.get("/findone/:caseId/:componentId",vddadvance.findOne);
router.post("/uploadfile",vddadvance.uploadFile);
router.post("/uploadproofofwork",vddadvance.uploadProofOfWork);
router.post("/uploadpvproofofwork",vddadvance.uploadPvProofOfWork);
router.post("/uploadpaymentproof",vddadvance.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",vddadvance.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",vddadvance.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",vddadvance.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",vddadvance.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",vddadvance.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",vddadvance.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",vddadvance.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",vddadvance.readPaymentProofs);
router.put("/:caseId/:componentId",vddadvance.update);
router.put("/updatedataentrystatus/:caseId/:componentId",vddadvance.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",vddadvance.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",vddadvance.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",vddadvance.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",vddadvance.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",vddadvance.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",vddadvance.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",vddadvance.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",vddadvance.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",vddadvance.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",vddadvance.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",vddadvance.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",vddadvance.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",vddadvance.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",vddadvance.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",vddadvance.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",vddadvance.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",vddadvance.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",vddadvance.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",vddadvance.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",vddadvance.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",vddadvance.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",vddadvance.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",vddadvance.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",vddadvance.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",vddadvance.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",vddadvance.addNote);
router.get("/findcomponentsfor/:for",vddadvance.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",vddadvance.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",vddadvance.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",vddadvance.reinitiateCheck);
router.get("/",vddadvance.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
