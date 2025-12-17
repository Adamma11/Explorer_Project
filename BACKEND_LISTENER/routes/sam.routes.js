const sam = require('../controllers/data_entry/sam.controller');
const express = require('express');
const router = express.Router();

router.post("/",sam.create);
router.get("/:case",sam.findAllForACase);
router.get("/findone/:caseId/:componentId",sam.findOne);
router.post("/uploadfile",sam.uploadFile);
router.post("/uploadproofofwork",sam.uploadProofOfWork);
router.post("/uploadpvproofofwork",sam.uploadPvProofOfWork);
router.post("/uploadpaymentproof",sam.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",sam.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",sam.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",sam.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",sam.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",sam.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",sam.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",sam.readPaymentProofs);
router.put("/:caseId/:componentId",sam.update);
router.put("/updatedataentrystatus/:caseId/:componentId",sam.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",sam.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",sam.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",sam.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",sam.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",sam.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",sam.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",sam.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",sam.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",sam.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",sam.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",sam.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",sam.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",sam.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",sam.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",sam.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",sam.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",sam.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",sam.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",sam.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",sam.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",sam.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",sam.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",sam.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",sam.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",sam.addNote);
router.get("/findcomponentsfor/:for",sam.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",sam.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",sam.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",sam.reinitiateCheck);
router.post("/addquicknote", sam.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", sam.getAllquicknoteForACheck)
module.exports = router;
