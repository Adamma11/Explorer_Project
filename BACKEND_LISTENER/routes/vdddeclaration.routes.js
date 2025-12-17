const vdddeclaration = require('../controllers/data_entry/vdddeclaration.controller');
const express = require('express');
const router = express.Router();

router.post("/",vdddeclaration.create);
router.get("/:case",vdddeclaration.findAllForACase);
router.get("/findone/:caseId/:componentId",vdddeclaration.findOne);
router.post("/uploadfile",vdddeclaration.uploadFile);
router.post("/uploadproofofwork",vdddeclaration.uploadProofOfWork);
router.post("/uploadpvproofofwork",vdddeclaration.uploadPvProofOfWork);
router.post("/uploadpaymentproof",vdddeclaration.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",vdddeclaration.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",vdddeclaration.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",vdddeclaration.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",vdddeclaration.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",vdddeclaration.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",vdddeclaration.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",vdddeclaration.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",vdddeclaration.readPaymentProofs);
router.put("/:caseId/:componentId",vdddeclaration.update);
router.put("/updatedataentrystatus/:caseId/:componentId",vdddeclaration.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",vdddeclaration.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",vdddeclaration.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",vdddeclaration.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",vdddeclaration.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",vdddeclaration.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",vdddeclaration.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",vdddeclaration.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",vdddeclaration.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",vdddeclaration.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",vdddeclaration.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",vdddeclaration.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",vdddeclaration.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",vdddeclaration.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",vdddeclaration.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",vdddeclaration.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",vdddeclaration.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",vdddeclaration.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",vdddeclaration.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",vdddeclaration.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",vdddeclaration.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",vdddeclaration.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",vdddeclaration.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",vdddeclaration.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",vdddeclaration.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",vdddeclaration.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",vdddeclaration.addNote);
router.get("/findcomponentsfor/:for",vdddeclaration.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",vdddeclaration.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",vdddeclaration.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",vdddeclaration.reinitiateCheck);
//router.get("/",vdddeclaration.getChecksWhereGradeOneIsNullAndGradeNotNull)
//router.get("/",vdddeclaration.getChecksWhereVerifierNotFoundInUser)
module.exports = router;

