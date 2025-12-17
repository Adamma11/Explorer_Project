const sanctionsbase = require('../controllers/data_entry/sanctionsbase.controller');
const express = require('express');
const router = express.Router();

router.post("/",sanctionsbase.create);
router.get("/:case",sanctionsbase.findAllForACase);
router.get("/findone/:caseId/:componentId",sanctionsbase.findOne);
router.post("/uploadfile",sanctionsbase.uploadFile);
router.post("/uploadproofofwork",sanctionsbase.uploadProofOfWork);
router.post("/uploadpvproofofwork",sanctionsbase.uploadPvProofOfWork);
router.post("/uploadpaymentproof",sanctionsbase.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",sanctionsbase.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",sanctionsbase.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",sanctionsbase.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",sanctionsbase.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",sanctionsbase.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",sanctionsbase.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",sanctionsbase.readPaymentProofs);
router.put("/:caseId/:componentId",sanctionsbase.update);
router.put("/updatedataentrystatus/:caseId/:componentId",sanctionsbase.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",sanctionsbase.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",sanctionsbase.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",sanctionsbase.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",sanctionsbase.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",sanctionsbase.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",sanctionsbase.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",sanctionsbase.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",sanctionsbase.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",sanctionsbase.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",sanctionsbase.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",sanctionsbase.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",sanctionsbase.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",sanctionsbase.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",sanctionsbase.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",sanctionsbase.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",sanctionsbase.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",sanctionsbase.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",sanctionsbase.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",sanctionsbase.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",sanctionsbase.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",sanctionsbase.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",sanctionsbase.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",sanctionsbase.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",sanctionsbase.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",sanctionsbase.addNote);
router.get("/findcomponentsfor/:for",sanctionsbase.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",sanctionsbase.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",sanctionsbase.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",sanctionsbase.reinitiateCheck);
router.post("/addquicknote", sanctionsbase.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", sanctionsbase.getAllquicknoteForACheck)
module.exports = router;
