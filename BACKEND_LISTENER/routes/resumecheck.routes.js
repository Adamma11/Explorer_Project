const resumecheck = require('../controllers/data_entry/resumecheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",resumecheck.create);
router.get("/:case",resumecheck.findAllForACase);
router.get("/findone/:caseId/:componentId",resumecheck.findOne);
router.post("/uploadfile",resumecheck.uploadFile);
router.post("/uploadproofofwork",resumecheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",resumecheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",resumecheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",resumecheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",resumecheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",resumecheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",resumecheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",resumecheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",resumecheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",resumecheck.readPaymentProofs);
router.put("/:caseId/:componentId",resumecheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",resumecheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",resumecheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",resumecheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",resumecheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",resumecheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",resumecheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",resumecheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",resumecheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",resumecheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",resumecheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",resumecheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",resumecheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",resumecheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",resumecheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",resumecheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",resumecheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",resumecheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",resumecheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",resumecheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",resumecheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",resumecheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",resumecheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",resumecheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",resumecheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",resumecheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",resumecheck.addNote);
router.get("/findcomponentsfor/:for",resumecheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",resumecheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",resumecheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",resumecheck.reinitiateCheck);
router.post("/addquicknote", resumechecks.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", resumechecks.getAllquicknoteForACheck)
module.exports = router;
