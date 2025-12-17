const courtrecord = require('../controllers/data_entry/courtrecord.controller');
const express = require('express');
const router = express.Router();

router.post("/",courtrecord.createForCde);
//router.get("/:case",courtrecord.findAllForACase);
router.get("/findone/:caseId/:serialNumber",courtrecord.findOneForCde);
router.post("/uploadfile",courtrecord.uploadFileForCde);
//router.post("/uploadproofofwork",courtrecord.uploadProofOfWork);
//router.post("/uploadpvproofofwork",courtrecord.uploadPvProofOfWork);
//router.post("/uploadpaymentproof",courtrecord.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId",courtrecord.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",courtrecord.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",courtrecord.downloadFileForCde);
//router.get("/downloadproofofwork/:caseId/:componentName/:componentId",courtrecord.downloadProofOfWork);
//router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",courtrecord.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",courtrecord.readFileNamesForCde);
//router.get("/readproofofworks/:caseId/:componentName/:componentId",courtrecord.readProofOfWorks);
//router.get("/readpaymentproofs/:caseId/:componentName/:componentId",courtrecord.readPaymentProofs);
router.put("/:caseId/:componentId",courtrecord.updateForCde);
/*router.put("/updatedataentrystatus/:caseId/:componentId",courtrecord.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",courtrecord.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",courtrecord.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",courtrecord.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",courtrecord.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",courtrecord.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",courtrecord.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",courtrecord.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",courtrecord.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",courtrecord.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",courtrecord.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",courtrecord.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",courtrecord.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",courtrecord.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",courtrecord.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",courtrecord.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",courtrecord.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",courtrecord.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",courtrecord.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",courtrecord.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",courtrecord.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",courtrecord.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",courtrecord.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",courtrecord.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",courtrecord.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",courtrecord.addNote);
router.get("/findcomponentsfor/:for",courtrecord.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",courtrecord.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",courtrecord.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",courtrecord.reinitiateCheck);*/
module.exports = router;
