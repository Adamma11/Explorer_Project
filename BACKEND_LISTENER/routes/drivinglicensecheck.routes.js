const drivinglicensecheck = require('../controllers/data_entry/drivinglicensecheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",drivinglicensecheck.create);
router.get("/:case",drivinglicensecheck.findAllForACase);
router.get("/findone/:caseId/:componentId",drivinglicensecheck.findOne);
router.post("/uploadfile",drivinglicensecheck.uploadFile);
router.post("/uploadproofofwork",drivinglicensecheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",drivinglicensecheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",drivinglicensecheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",drivinglicensecheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",drivinglicensecheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",drivinglicensecheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",drivinglicensecheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",drivinglicensecheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",drivinglicensecheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",drivinglicensecheck.readPaymentProofs);
router.put("/:caseId/:componentId",drivinglicensecheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",drivinglicensecheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",drivinglicensecheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",drivinglicensecheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",drivinglicensecheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",drivinglicensecheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",drivinglicensecheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",drivinglicensecheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",drivinglicensecheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",drivinglicensecheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",drivinglicensecheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",drivinglicensecheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",drivinglicensecheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",drivinglicensecheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",drivinglicensecheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",drivinglicensecheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",drivinglicensecheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",drivinglicensecheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",drivinglicensecheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",drivinglicensecheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",drivinglicensecheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",drivinglicensecheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",drivinglicensecheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",drivinglicensecheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",drivinglicensecheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",drivinglicensecheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",drivinglicensecheck.addNote);
router.get("/findcomponentsfor/:for",drivinglicensecheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",drivinglicensecheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",drivinglicensecheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",drivinglicensecheck.reinitiateCheck);
router.post("/addquicknote", drivinglicensecheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", drivinglicensecheck.getAllquicknoteForACheck)
module.exports = router;
