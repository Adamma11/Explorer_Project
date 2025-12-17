const emergencycontactcheck = require('../controllers/data_entry/emergencycontactcheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",emergencycontactcheck.create);
router.get("/:case",emergencycontactcheck.findAllForACase);
router.get("/findone/:caseId/:componentId",emergencycontactcheck.findOne);
router.post("/uploadfile",emergencycontactcheck.uploadFile);
router.post("/uploadproofofwork",emergencycontactcheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",emergencycontactcheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",emergencycontactcheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",emergencycontactcheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",emergencycontactcheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",emergencycontactcheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",emergencycontactcheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",emergencycontactcheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",emergencycontactcheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",emergencycontactcheck.readPaymentProofs);
router.put("/:caseId/:componentId",emergencycontactcheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",emergencycontactcheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",emergencycontactcheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",emergencycontactcheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",emergencycontactcheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",emergencycontactcheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",emergencycontactcheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",emergencycontactcheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",emergencycontactcheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",emergencycontactcheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",emergencycontactcheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",emergencycontactcheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",emergencycontactcheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",emergencycontactcheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",emergencycontactcheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",emergencycontactcheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",emergencycontactcheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",emergencycontactcheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",emergencycontactcheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",emergencycontactcheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",emergencycontactcheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",emergencycontactcheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",emergencycontactcheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",emergencycontactcheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",emergencycontactcheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",emergencycontactcheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",emergencycontactcheck.addNote);
router.get("/findcomponentsfor/:for",emergencycontactcheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",emergencycontactcheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",emergencycontactcheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",emergencycontactcheck.reinitiateCheck);
router.post("/addquicknote", emergencycontactcheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", emergencycontactcheck.getAllquicknoteForACheck)
module.exports = router;
