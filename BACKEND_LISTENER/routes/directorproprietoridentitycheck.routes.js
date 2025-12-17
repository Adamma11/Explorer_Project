const directorproprietoridentitycheck = require('../controllers/data_entry/directorproprietoridentitycheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",directorproprietoridentitycheck.create);
router.get("/:case",directorproprietoridentitycheck.findAllForACase);
router.get("/findone/:caseId/:componentId",directorproprietoridentitycheck.findOne);
router.post("/uploadfile",directorproprietoridentitycheck.uploadFile);
router.post("/uploadproofofwork",directorproprietoridentitycheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",directorproprietoridentitycheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",directorproprietoridentitycheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",directorproprietoridentitycheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorproprietoridentitycheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",directorproprietoridentitycheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",directorproprietoridentitycheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorproprietoridentitycheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",directorproprietoridentitycheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",directorproprietoridentitycheck.readPaymentProofs);
router.put("/:caseId/:componentId",directorproprietoridentitycheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",directorproprietoridentitycheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",directorproprietoridentitycheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",directorproprietoridentitycheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",directorproprietoridentitycheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",directorproprietoridentitycheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",directorproprietoridentitycheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",directorproprietoridentitycheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",directorproprietoridentitycheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",directorproprietoridentitycheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",directorproprietoridentitycheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",directorproprietoridentitycheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",directorproprietoridentitycheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",directorproprietoridentitycheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",directorproprietoridentitycheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",directorproprietoridentitycheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",directorproprietoridentitycheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",directorproprietoridentitycheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",directorproprietoridentitycheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",directorproprietoridentitycheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",directorproprietoridentitycheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",directorproprietoridentitycheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",directorproprietoridentitycheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",directorproprietoridentitycheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",directorproprietoridentitycheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",directorproprietoridentitycheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",directorproprietoridentitycheck.addNote);
router.get("/findcomponentsfor/:for",directorproprietoridentitycheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",directorproprietoridentitycheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",directorproprietoridentitycheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",directorproprietoridentitycheck.reinitiateCheck);
router.post("/addquicknote", directorproprietoridentitycheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", directorproprietoridentitycheck.getAllquicknoteForACheck)
module.exports = router;
