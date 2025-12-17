const empbasic = require('../controllers/data_entry/empbasic.controller');
const express = require('express');
const router = express.Router();

router.post("/",empbasic.createForCde);
//router.get("/:case",empbasic.findAllForACase);
router.get("/findone/:caseId/:serialNumber",empbasic.findOneForCde);
router.post("/uploadfile",empbasic.uploadFileForCde);
//router.post("/uploadproofofwork",empbasic.uploadProofOfWork);
//router.post("/uploadpvproofofwork",empbasic.uploadPvProofOfWork);
//router.post("/uploadpaymentproof",empbasic.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId",empbasic.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",empbasic.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",empbasic.downloadFileForCde);
//router.get("/downloadproofofwork/:caseId/:componentName/:componentId",empbasic.downloadProofOfWork);
//router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",empbasic.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",empbasic.readFileNamesForCde);
//router.get("/readproofofworks/:caseId/:componentName/:componentId",empbasic.readProofOfWorks);
//router.get("/readpaymentproofs/:caseId/:componentName/:componentId",empbasic.readPaymentProofs);
router.put("/:caseId/:componentId",empbasic.updateForCde);
/*router.put("/updatedataentrystatus/:caseId/:componentId",empbasic.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",empbasic.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",empbasic.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",empbasic.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",empbasic.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",empbasic.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",empbasic.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",empbasic.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",empbasic.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",empbasic.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",empbasic.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",empbasic.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",empbasic.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",empbasic.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",empbasic.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",empbasic.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",empbasic.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",empbasic.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",empbasic.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",empbasic.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",empbasic.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",empbasic.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",empbasic.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",empbasic.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",empbasic.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",empbasic.addNote);
router.get("/findcomponentsfor/:for",empbasic.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",empbasic.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",empbasic.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",empbasic.reinitiateCheck);*/
module.exports = router;
