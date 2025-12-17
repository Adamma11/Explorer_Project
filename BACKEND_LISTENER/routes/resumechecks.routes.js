const resumechecks = require('../controllers/data_entry/resumechecks.controller');
const express = require('express');
const router = express.Router();

router.post("/",resumechecks.create);
router.get("/:case",resumechecks.findAllForACase);
router.get("/findone/:caseId/:componentId",resumechecks.findOne);
router.post("/uploadfile",resumechecks.uploadFile);
router.post("/uploadproofofwork",resumechecks.uploadProofOfWork);
router.post("/uploadpvproofofwork",resumechecks.uploadPvProofOfWork);
router.post("/uploadpaymentproof",resumechecks.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",resumechecks.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",resumechecks.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",resumechecks.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",resumechecks.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",resumechecks.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",resumechecks.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",resumechecks.readPaymentProofs);
router.put("/:caseId/:componentId",resumechecks.update);
router.put("/updatedataentrystatus/:caseId/:componentId",resumechecks.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",resumechecks.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",resumechecks.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",resumechecks.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",resumechecks.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",resumechecks.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",resumechecks.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",resumechecks.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",resumechecks.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",resumechecks.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",resumechecks.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",resumechecks.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",resumechecks.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",resumechecks.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",resumechecks.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",resumechecks.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",resumechecks.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",resumechecks.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",resumechecks.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",resumechecks.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",resumechecks.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",resumechecks.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",resumechecks.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",resumechecks.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",resumechecks.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",resumechecks.addNote);
router.get("/findcomponentsfor/:for",resumechecks.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",resumechecks.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",resumechecks.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",resumechecks.reinitiateCheck);
router.post("/addquicknote", resumechecks.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", resumechecks.getAllquicknoteForACheck)

module.exports = router;
