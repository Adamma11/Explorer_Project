
const digipermanent = require('../controllers/data_entry/digipermanent.controller');
const express = require('express');
const router = express.Router();


router.post("/",digipermanent.create);
router.get("/:case",digipermanent.findAllForACase);
router.get("/findone/:caseId/:componentId",digipermanent.findOne);
router.post("/uploadfile",digipermanent.uploadFile);
router.post("/uploadproofofwork",digipermanent.uploadProofOfWork);
router.post("/uploadpvproofofwork",digipermanent.uploadPvProofOfWork);
router.post("/uploadpaymentproof",digipermanent.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",digipermanent.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",digipermanent.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",digipermanent.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",digipermanent.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",digipermanent.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",digipermanent.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",digipermanent.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",digipermanent.readPaymentProofs);
router.put("/:caseId/:componentId",digipermanent.update);
router.put("/clearcostapproval/:caseId/:componentId",digipermanent.clearCostApproval);
router.put("/updatedataentrystatus/:caseId/:componentId",digipermanent.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",digipermanent.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",digipermanent.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",digipermanent.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",digipermanent.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",digipermanent.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",digipermanent.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",digipermanent.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",digipermanent.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",digipermanent.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",digipermanent.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",digipermanent.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",digipermanent.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",digipermanent.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",digipermanent.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",digipermanent.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",digipermanent.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",digipermanent.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",digipermanent.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",digipermanent.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",digipermanent.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",digipermanent.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",digipermanent.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",digipermanent.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",digipermanent.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",digipermanent.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",digipermanent.addNote);
router.get("/findcomponentsfor/:for",digipermanent.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",digipermanent.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",digipermanent.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",digipermanent.reinitiateCheck);
router.get("/",digipermanent.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", digipermanent.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", digipermanent.getAllquicknoteForACheck)
module.exports = router;
        