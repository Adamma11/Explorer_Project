const epfo = require('../controllers/data_entry/epfo.controller');
const express = require('express');
const router = express.Router();

router.post("/",epfo.create);
router.get("/:case",epfo.findAllForACase);
router.get("/findone/:caseId/:componentId",epfo.findOne);
router.post("/uploadfile",epfo.uploadFile);
router.post("/uploadproofofwork",epfo.uploadProofOfWork);
router.post("/uploadpvproofofwork",epfo.uploadPvProofOfWork);
router.post("/uploadpaymentproof",epfo.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",epfo.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",epfo.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",epfo.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",epfo.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",epfo.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",epfo.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",epfo.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",epfo.readPaymentProofs);
router.put("/:caseId/:componentId",epfo.update);
router.put("/updatedataentrystatus/:caseId/:componentId",epfo.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",epfo.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",epfo.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",epfo.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",epfo.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",epfo.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",epfo.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",epfo.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",epfo.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",epfo.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",epfo.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",epfo.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",epfo.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",epfo.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",epfo.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",epfo.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",epfo.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",epfo.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",epfo.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",epfo.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",epfo.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",epfo.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",epfo.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",epfo.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",epfo.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",epfo.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",epfo.addNote);
router.get("/findcomponentsfor/:for",epfo.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",epfo.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",epfo.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",epfo.reinitiateCheck);
//router.get("/",epfo.getChecksWhereGradeOneIsNullAndGradeNotNull)
router.get("/",epfo.getChecksWhereVerifierNotFoundInUser)
module.exports = router;
