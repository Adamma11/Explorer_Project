const addresscomprehensive = require('../controllers/data_entry/addresscomprehensive.controller');
const express = require('express');
const router = express.Router();

router.post("/",addresscomprehensive.create);
router.get("/:case",addresscomprehensive.findAllForACase);
router.get("/findone/:caseId/:componentId",addresscomprehensive.findOne);
router.post("/uploadfile",addresscomprehensive.uploadFile);
router.post("/uploadproofofwork",addresscomprehensive.uploadProofOfWork);
router.post("/uploadpvproofofwork",addresscomprehensive.uploadPvProofOfWork);
router.post("/uploadpaymentproof",addresscomprehensive.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",addresscomprehensive.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",addresscomprehensive.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",addresscomprehensive.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",addresscomprehensive.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",addresscomprehensive.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",addresscomprehensive.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",addresscomprehensive.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",addresscomprehensive.readPaymentProofs);
router.put("/:caseId/:componentId",addresscomprehensive.update);
router.put("/updatedataentrystatus/:caseId/:componentId",addresscomprehensive.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",addresscomprehensive.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",addresscomprehensive.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",addresscomprehensive.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",addresscomprehensive.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",addresscomprehensive.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",addresscomprehensive.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",addresscomprehensive.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",addresscomprehensive.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",addresscomprehensive.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",addresscomprehensive.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",addresscomprehensive.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",addresscomprehensive.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",addresscomprehensive.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",addresscomprehensive.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",addresscomprehensive.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",addresscomprehensive.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",addresscomprehensive.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",addresscomprehensive.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",addresscomprehensive.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",addresscomprehensive.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",addresscomprehensive.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",addresscomprehensive.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",addresscomprehensive.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",addresscomprehensive.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",addresscomprehensive.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",addresscomprehensive.addNote);
router.get("/findcomponentsfor/:for",addresscomprehensive.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",addresscomprehensive.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",addresscomprehensive.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",addresscomprehensive.reinitiateCheck);
router.get("/",addresscomprehensive.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
