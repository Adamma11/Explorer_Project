const caconfirmation = require('../controllers/data_entry/caconfirmation.controller');
const express = require('express');
const router = express.Router();

router.post("/",caconfirmation.create);
router.get("/:case",caconfirmation.findAllForACase);
router.get("/findone/:caseId/:componentId",caconfirmation.findOne);
router.post("/uploadfile",caconfirmation.uploadFile);
router.post("/uploadproofofwork",caconfirmation.uploadProofOfWork);
router.post("/uploadpvproofofwork",caconfirmation.uploadPvProofOfWork);
router.post("/uploadpaymentproof",caconfirmation.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",caconfirmation.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",caconfirmation.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",caconfirmation.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",caconfirmation.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",caconfirmation.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",caconfirmation.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",caconfirmation.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",caconfirmation.readPaymentProofs);
router.put("/:caseId/:componentId",caconfirmation.update);
router.put("/updatedataentrystatus/:caseId/:componentId",caconfirmation.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",caconfirmation.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",caconfirmation.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",caconfirmation.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",caconfirmation.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",caconfirmation.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",caconfirmation.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",caconfirmation.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",caconfirmation.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",caconfirmation.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",caconfirmation.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",caconfirmation.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",caconfirmation.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",caconfirmation.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",caconfirmation.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",caconfirmation.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",caconfirmation.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",caconfirmation.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",caconfirmation.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",caconfirmation.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",caconfirmation.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",caconfirmation.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",caconfirmation.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",caconfirmation.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",caconfirmation.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",caconfirmation.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",caconfirmation.addNote);
router.get("/findcomponentsfor/:for",caconfirmation.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",caconfirmation.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",caconfirmation.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",caconfirmation.reinitiateCheck);
//router.get("/",caconfirmation.getChecksWhereGradeOneIsNullAndGradeNotNull)
router.get("/",caconfirmation.getChecksWhereVerifierNotFoundInUser)
module.exports = router;
