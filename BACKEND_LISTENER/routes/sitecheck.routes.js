const sitecheck = require('../controllers/data_entry/sitecheck.controller');
const express = require('express');
const router = express.Router();

router.post("/",sitecheck.create);
router.get("/:case",sitecheck.findAllForACase);
router.get("/findone/:caseId/:componentId",sitecheck.findOne);
router.post("/uploadfile",sitecheck.uploadFile);
router.post("/uploadproofofwork",sitecheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",sitecheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",sitecheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",sitecheck.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",sitecheck.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",sitecheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",sitecheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",sitecheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",sitecheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",sitecheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",sitecheck.readPaymentProofs);
router.put("/:caseId/:componentId",sitecheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",sitecheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",sitecheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",sitecheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",sitecheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",sitecheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",sitecheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",sitecheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",sitecheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",sitecheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",sitecheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",sitecheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",sitecheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",sitecheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",sitecheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",sitecheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",sitecheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",sitecheck.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",sitecheck.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",sitecheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",sitecheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",sitecheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",sitecheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",sitecheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",sitecheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",sitecheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",sitecheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",sitecheck.addNote);
router.get("/findcomponentsfor/:for",sitecheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",sitecheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",sitecheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",sitecheck.reinitiateCheck);
router.get("/",sitecheck.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
