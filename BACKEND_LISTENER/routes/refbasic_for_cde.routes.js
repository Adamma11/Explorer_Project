const refbasic = require('../controllers/data_entry/refbasic.controller');
const express = require('express');
const router = express.Router();

router.post("/",refbasic.createForCde);
//router.get("/:case",refbasic.findAllForACase);
router.get("/findone/:caseId/:serialNumber",refbasic.findOneForCde);
router.post("/uploadfile",refbasic.uploadFileForCde);
//router.post("/uploadproofofwork",refbasic.uploadProofOfWork);
//router.post("/uploadpvproofofwork",refbasic.uploadPvProofOfWork);
//router.post("/uploadpaymentproof",refbasic.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId",refbasic.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",refbasic.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",refbasic.downloadFileForCde);
//router.get("/downloadproofofwork/:caseId/:componentName/:componentId",refbasic.downloadProofOfWork);
//router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",refbasic.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",refbasic.readFileNamesForCde);
//router.get("/readproofofworks/:caseId/:componentName/:componentId",refbasic.readProofOfWorks);
//router.get("/readpaymentproofs/:caseId/:componentName/:componentId",refbasic.readPaymentProofs);
router.put("/:caseId/:componentId",refbasic.updateForCde);
/*router.put("/updatedataentrystatus/:caseId/:componentId",refbasic.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",refbasic.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",refbasic.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",refbasic.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",refbasic.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",refbasic.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",refbasic.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",refbasic.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",refbasic.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",refbasic.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",refbasic.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",refbasic.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",refbasic.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",refbasic.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",refbasic.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",refbasic.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",refbasic.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",refbasic.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",refbasic.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",refbasic.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",refbasic.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",refbasic.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",refbasic.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",refbasic.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",refbasic.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",refbasic.addNote);
router.get("/findcomponentsfor/:for",refbasic.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",refbasic.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",refbasic.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",refbasic.reinitiateCheck);*/
module.exports = router;
