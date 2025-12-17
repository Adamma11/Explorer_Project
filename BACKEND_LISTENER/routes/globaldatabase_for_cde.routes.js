const globaldatabase = require('../controllers/data_entry/globaldatabase.controller');
const express = require('express');
const router = express.Router();

router.post("/",globaldatabase.createForCde);
//router.get("/:case",globaldatabase.findAllForACase);
router.get("/findone/:caseId/:serialNumber",globaldatabase.findOneForCde);
router.post("/uploadfile",globaldatabase.uploadFileForCde);
//router.post("/uploadproofofwork",globaldatabase.uploadProofOfWork);
//router.post("/uploadpvproofofwork",globaldatabase.uploadPvProofOfWork);
//router.post("/uploadpaymentproof",globaldatabase.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId",globaldatabase.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",globaldatabase.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",globaldatabase.downloadFileForCde);
//router.get("/downloadproofofwork/:caseId/:componentName/:componentId",globaldatabase.downloadProofOfWork);
//router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",globaldatabase.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",globaldatabase.readFileNamesForCde);
//router.get("/readproofofworks/:caseId/:componentName/:componentId",globaldatabase.readProofOfWorks);
//router.get("/readpaymentproofs/:caseId/:componentName/:componentId",globaldatabase.readPaymentProofs);
router.put("/:caseId/:componentId",globaldatabase.updateForCde);
/*router.put("/updatedataentrystatus/:caseId/:componentId",globaldatabase.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",globaldatabase.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",globaldatabase.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",globaldatabase.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",globaldatabase.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",globaldatabase.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",globaldatabase.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",globaldatabase.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",globaldatabase.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",globaldatabase.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",globaldatabase.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",globaldatabase.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",globaldatabase.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",globaldatabase.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",globaldatabase.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",globaldatabase.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",globaldatabase.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",globaldatabase.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",globaldatabase.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",globaldatabase.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",globaldatabase.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",globaldatabase.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",globaldatabase.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",globaldatabase.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",globaldatabase.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",globaldatabase.addNote);
router.get("/findcomponentsfor/:for",globaldatabase.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",globaldatabase.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",globaldatabase.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",globaldatabase.reinitiateCheck);*/
module.exports = router;
