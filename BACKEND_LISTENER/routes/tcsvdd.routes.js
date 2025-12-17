const tcsvdd = require('../controllers/data_entry/tcsvdd.controller');
const express = require('express');
const router = express.Router();

router.post("/",tcsvdd.create);
router.get("/:case",tcsvdd.findAllForACase);
router.get("/findone/:caseId/:componentId",tcsvdd.findOne);
router.post("/uploadfile",tcsvdd.uploadFile);
router.post("/uploadproofofwork",tcsvdd.uploadProofOfWork);
router.post("/uploadpvproofofwork",tcsvdd.uploadPvProofOfWork);
router.post("/uploadpaymentproof",tcsvdd.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",tcsvdd.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",tcsvdd.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",tcsvdd.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",tcsvdd.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",tcsvdd.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",tcsvdd.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",tcsvdd.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",tcsvdd.readPaymentProofs);
router.put("/:caseId/:componentId",tcsvdd.update);
router.put("/updatedataentrystatus/:caseId/:componentId",tcsvdd.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",tcsvdd.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",tcsvdd.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",tcsvdd.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",tcsvdd.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",tcsvdd.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",tcsvdd.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",tcsvdd.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",tcsvdd.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",tcsvdd.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",tcsvdd.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",tcsvdd.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",tcsvdd.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",tcsvdd.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",tcsvdd.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",tcsvdd.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",tcsvdd.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",tcsvdd.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",tcsvdd.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",tcsvdd.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",tcsvdd.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",tcsvdd.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",tcsvdd.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",tcsvdd.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",tcsvdd.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",tcsvdd.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",tcsvdd.addNote);
router.get("/findcomponentsfor/:for",tcsvdd.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",tcsvdd.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",tcsvdd.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",tcsvdd.reinitiateCheck);
//router.get("/",tcsvdd.getChecksWhereGradeOneIsNullAndGradeNotNull)
//router.get("/",tcsvdd.getChecksWhereVerifierNotFoundInUser)
module.exports = router;

