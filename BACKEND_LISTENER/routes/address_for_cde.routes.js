const address = require('../controllers/data_entry/address.controller');
const express = require('express');
const router = express.Router();

router.post("/",address.createForCde);
//router.get("/:case",address.findAllForACase);
router.get("/findone/:caseId/:serialNumber",address.findOneForCde);
router.post("/uploadfile",address.uploadFileForCde);
//router.post("/uploadproofofwork",address.uploadProofOfWork);
//router.post("/uploadpvproofofwork",address.uploadPvProofOfWork);
//router.post("/uploadpaymentproof",address.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId",address.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",address.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",address.downloadFileForCde);
//router.get("/downloadproofofwork/:caseId/:componentName/:componentId",address.downloadProofOfWork);
//router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",address.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",address.readFileNamesForCde);
/*router.get("/readproofofworks/:caseId/:componentName/:componentId",address.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",address.readPaymentProofs);*/
router.put("/:caseId/:componentId",address.updateForCde);
/*router.put("/:caseId/:componentId",address.update);
router.put("/updatedataentrystatus/:caseId/:componentId",address.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",address.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",address.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",address.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",address.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",address.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",address.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",address.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",address.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",address.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",address.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",address.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",address.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",address.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",address.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",address.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",address.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",address.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",address.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",address.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",address.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",address.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",address.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",address.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",address.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",address.addNote);
router.get("/findcomponentsfor/:for",address.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",address.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",address.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",address.reinitiateCheck);*/
module.exports = router;
