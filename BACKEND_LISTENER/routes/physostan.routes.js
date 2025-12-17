const physostan = require('../controllers/data_entry/physostan.controller');
const express = require('express');
const router = express.Router();

router.post("/",physostan.create);
router.get("/:case",physostan.findAllForACase);
router.get("/findone/:caseId/:componentId",physostan.findOne);
router.post("/uploadfile",physostan.uploadFile);
router.post("/uploadproofofwork",physostan.uploadProofOfWork);
router.post("/uploadpvproofofwork",physostan.uploadPvProofOfWork);
router.post("/uploadpaymentproof",physostan.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",physostan.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",physostan.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",physostan.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",physostan.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",physostan.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",physostan.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",physostan.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",physostan.readPaymentProofs);
router.put("/:caseId/:componentId",physostan.update);
router.put("/updatedataentrystatus/:caseId/:componentId",physostan.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",physostan.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",physostan.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",physostan.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",physostan.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",physostan.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",physostan.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",physostan.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",physostan.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",physostan.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",physostan.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",physostan.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",physostan.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",physostan.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",physostan.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",physostan.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",physostan.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",physostan.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",physostan.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",physostan.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",physostan.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",physostan.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",physostan.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",physostan.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",physostan.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",physostan.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",physostan.addNote);
router.get("/findcomponentsfor/:for",physostan.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",physostan.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",physostan.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",physostan.reinitiateCheck);
router.get("/",physostan.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
