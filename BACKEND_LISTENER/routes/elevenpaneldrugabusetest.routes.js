const elevenpaneldrugabusetest = require('../controllers/data_entry/elevenpaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();

router.post("/",elevenpaneldrugabusetest.create);
router.get("/:case",elevenpaneldrugabusetest.findAllForACase);
router.get("/findone/:caseId/:componentId",elevenpaneldrugabusetest.findOne);
router.post("/uploadfile",elevenpaneldrugabusetest.uploadFile);
router.post("/uploadproofofwork",elevenpaneldrugabusetest.uploadProofOfWork);
router.post("/uploadpvproofofwork",elevenpaneldrugabusetest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",elevenpaneldrugabusetest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",elevenpaneldrugabusetest.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",elevenpaneldrugabusetest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",elevenpaneldrugabusetest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",elevenpaneldrugabusetest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",elevenpaneldrugabusetest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",elevenpaneldrugabusetest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",elevenpaneldrugabusetest.readPaymentProofs);
router.put("/:caseId/:componentId",elevenpaneldrugabusetest.update);
router.put("/updatedataentrystatus/:caseId/:componentId",elevenpaneldrugabusetest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",elevenpaneldrugabusetest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",elevenpaneldrugabusetest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",elevenpaneldrugabusetest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",elevenpaneldrugabusetest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",elevenpaneldrugabusetest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",elevenpaneldrugabusetest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",elevenpaneldrugabusetest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",elevenpaneldrugabusetest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",elevenpaneldrugabusetest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",elevenpaneldrugabusetest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",elevenpaneldrugabusetest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",elevenpaneldrugabusetest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",elevenpaneldrugabusetest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",elevenpaneldrugabusetest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",elevenpaneldrugabusetest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",elevenpaneldrugabusetest.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",elevenpaneldrugabusetest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",elevenpaneldrugabusetest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",elevenpaneldrugabusetest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",elevenpaneldrugabusetest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",elevenpaneldrugabusetest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",elevenpaneldrugabusetest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",elevenpaneldrugabusetest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",elevenpaneldrugabusetest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",elevenpaneldrugabusetest.addNote);
router.get("/findcomponentsfor/:for",elevenpaneldrugabusetest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",elevenpaneldrugabusetest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",elevenpaneldrugabusetest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",elevenpaneldrugabusetest.reinitiateCheck);
router.post("/addquicknote", elevenpaneldrugabusetest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", elevenpaneldrugabusetest.getAllquicknoteForACheck)
module.exports = router;
