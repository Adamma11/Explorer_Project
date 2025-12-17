const vddpv = require('../controllers/data_entry/vddpv.controller');
const express = require('express');
const router = express.Router();

router.post("/",vddpv.create);
router.get("/:case",vddpv.findAllForACase);
router.get("/findone/:caseId/:componentId",vddpv.findOne);
router.post("/uploadfile",vddpv.uploadFile);
router.post("/uploadproofofwork",vddpv.uploadProofOfWork);
router.post("/uploadpvproofofwork",vddpv.uploadPvProofOfWork);
router.post("/uploadpaymentproof",vddpv.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",vddpv.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",vddpv.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",vddpv.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",vddpv.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",vddpv.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",vddpv.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",vddpv.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",vddpv.readPaymentProofs);
router.put("/:caseId/:componentId",vddpv.update);
router.put("/updatedataentrystatus/:caseId/:componentId",vddpv.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",vddpv.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",vddpv.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",vddpv.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",vddpv.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",vddpv.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",vddpv.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",vddpv.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",vddpv.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",vddpv.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",vddpv.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",vddpv.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",vddpv.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",vddpv.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",vddpv.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",vddpv.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",vddpv.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",vddpv.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",vddpv.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",vddpv.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",vddpv.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",vddpv.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",vddpv.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",vddpv.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",vddpv.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",vddpv.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",vddpv.addNote);
router.get("/findcomponentsfor/:for",vddpv.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",vddpv.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",vddpv.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",vddpv.reinitiateCheck);
//router.get("/",vddpv.getChecksWhereGradeOneIsNullAndGradeNotNull)
//router.get("/",vddpv.getChecksWhereVerifierNotFoundInUser)
module.exports = router;

