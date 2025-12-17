
const identitytest = require('../controllers/data_entry/identitytest.controller');
const express = require('express');
const router = express.Router();

router.post("/addquicknote", identitytest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", identitytest.getAllquicknoteForACheck)
router.post("/",identitytest.create);
router.get("/:case",identitytest.findAllForACase);
router.get("/findone/:caseId/:componentId",identitytest.findOne);
router.post("/uploadfile",identitytest.uploadFile);
router.post("/uploadproofofwork",identitytest.uploadProofOfWork);
router.post("/uploadpvproofofwork",identitytest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",identitytest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",identitytest.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",identitytest.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",identitytest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",identitytest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",identitytest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",identitytest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",identitytest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",identitytest.readPaymentProofs);
router.put("/:caseId/:componentId",identitytest.update);
router.put("/clearcostapproval/:caseId/:componentId",identitytest.clearCostApproval);
router.put("/updatedataentrystatus/:caseId/:componentId",identitytest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",identitytest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",identitytest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",identitytest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",identitytest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",identitytest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",identitytest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",identitytest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",identitytest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",identitytest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",identitytest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",identitytest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",identitytest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",identitytest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",identitytest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",identitytest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",identitytest.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",identitytest.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",identitytest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",identitytest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",identitytest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",identitytest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",identitytest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",identitytest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",identitytest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",identitytest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",identitytest.addNote);
router.get("/findcomponentsfor/:for",identitytest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",identitytest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",identitytest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",identitytest.reinitiateCheck);
router.get("/",identitytest.getChecksWhereGradeOneIsNullAndGradeNotNull);
module.exports = router;
        