const addressbusiness = require('../controllers/data_entry/addressbusiness.controller');
const express = require('express');
const router = express.Router();

router.post("/",addressbusiness.create);
router.get("/:case",addressbusiness.findAllForACase);
router.get("/findone/:caseId/:componentId",addressbusiness.findOne);
router.post("/uploadfile",addressbusiness.uploadFile);
router.post("/uploadproofofwork",addressbusiness.uploadProofOfWork);
router.post("/uploadpvproofofwork",addressbusiness.uploadPvProofOfWork);
router.post("/uploadpaymentproof",addressbusiness.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",addressbusiness.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",addressbusiness.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",addressbusiness.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",addressbusiness.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",addressbusiness.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",addressbusiness.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",addressbusiness.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",addressbusiness.readPaymentProofs);
router.put("/:caseId/:componentId",addressbusiness.update);
router.put("/updatedataentrystatus/:caseId/:componentId",addressbusiness.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",addressbusiness.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",addressbusiness.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",addressbusiness.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",addressbusiness.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",addressbusiness.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",addressbusiness.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",addressbusiness.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",addressbusiness.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",addressbusiness.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",addressbusiness.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",addressbusiness.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",addressbusiness.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",addressbusiness.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",addressbusiness.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",addressbusiness.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",addressbusiness.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",addressbusiness.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",addressbusiness.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",addressbusiness.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",addressbusiness.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",addressbusiness.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",addressbusiness.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",addressbusiness.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",addressbusiness.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",addressbusiness.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",addressbusiness.addNote);
router.get("/findcomponentsfor/:for",addressbusiness.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",addressbusiness.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",addressbusiness.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",addressbusiness.reinitiateCheck);
router.get("/",addressbusiness.getChecksWhereGradeOneIsNullAndGradeNotNull)
router.get("/",addressbusiness.getChecksWhereVerifierNotFoundInUser)
module.exports = router;
