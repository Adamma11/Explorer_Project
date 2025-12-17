
const bic = require('../controllers/data_entry/bic.controller');
const express = require('express');
const router = express.Router();


router.post("/",bic.create);
router.get("/:case",bic.findAllForACase);
router.get("/findone/:caseId/:componentId",bic.findOne);
router.post("/uploadfile",bic.uploadFile);
router.post("/uploadproofofwork",bic.uploadProofOfWork);
router.post("/uploadpvproofofwork",bic.uploadPvProofOfWork);
router.post("/uploadpaymentproof",bic.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",bic.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",bic.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",bic.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",bic.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",bic.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",bic.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",bic.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",bic.readPaymentProofs);
router.put("/:caseId/:componentId",bic.update);
router.put("/clearcostapproval/:caseId/:componentId",bic.clearCostApproval);
router.put("/updatedataentrystatus/:caseId/:componentId",bic.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",bic.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",bic.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",bic.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",bic.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",bic.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",bic.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",bic.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",bic.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",bic.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",bic.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",bic.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",bic.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",bic.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",bic.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",bic.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",bic.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",bic.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",bic.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",bic.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",bic.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",bic.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",bic.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",bic.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",bic.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",bic.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",bic.addNote);
router.get("/findcomponentsfor/:for",bic.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",bic.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",bic.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",bic.reinitiateCheck);
router.get("/",bic.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", bic.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", bic.getAllquicknoteForACheck)
module.exports = router;
        