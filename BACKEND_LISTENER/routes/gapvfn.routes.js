const gapvfn = require('../controllers/data_entry/gapvfn.controller');
const express = require('express');
const router = express.Router();

router.post("/",gapvfn.create);
router.get("/:case",gapvfn.findAllForACase);
router.get("/findone/:caseId/:componentId",gapvfn.findOne);
router.post("/uploadfile",gapvfn.uploadFile);
router.post("/uploadproofofwork",gapvfn.uploadProofOfWork);
router.post("/uploadpvproofofwork",gapvfn.uploadPvProofOfWork);
router.post("/uploadpaymentproof",gapvfn.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",gapvfn.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",gapvfn.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",gapvfn.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",gapvfn.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",gapvfn.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",gapvfn.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",gapvfn.readPaymentProofs);
router.put("/:caseId/:componentId",gapvfn.update);
router.put("/updatedataentrystatus/:caseId/:componentId",gapvfn.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",gapvfn.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",gapvfn.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",gapvfn.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",gapvfn.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",gapvfn.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",gapvfn.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",gapvfn.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",gapvfn.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",gapvfn.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",gapvfn.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",gapvfn.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",gapvfn.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",gapvfn.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",gapvfn.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",gapvfn.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",gapvfn.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",gapvfn.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",gapvfn.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",gapvfn.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",gapvfn.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",gapvfn.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",gapvfn.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",gapvfn.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",gapvfn.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",gapvfn.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",gapvfn.addNote);
router.get("/findcomponentsfor/:for",gapvfn.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",gapvfn.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",gapvfn.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",gapvfn.reinitiateCheck);
//router.get("/",gapvfn.getChecksWhereGradeOneIsNullAndGradeNotNull)
router.get("/",gapvfn.getChecksWhereVerifierNotFoundInUser)
module.exports = router;
