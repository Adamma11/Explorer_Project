const twelvepaneldrugabusetest = require('../controllers/data_entry/twelvepaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();

router.post("/",twelvepaneldrugabusetest.create);
router.get("/:case",twelvepaneldrugabusetest.findAllForACase);
router.get("/findone/:caseId/:componentId",twelvepaneldrugabusetest.findOne);
router.post("/uploadfile",twelvepaneldrugabusetest.uploadFile);
router.post("/uploadproofofwork",twelvepaneldrugabusetest.uploadProofOfWork);
router.post("/uploadpvproofofwork",twelvepaneldrugabusetest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",twelvepaneldrugabusetest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",twelvepaneldrugabusetest.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",twelvepaneldrugabusetest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",twelvepaneldrugabusetest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",twelvepaneldrugabusetest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",twelvepaneldrugabusetest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",twelvepaneldrugabusetest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",twelvepaneldrugabusetest.readPaymentProofs);
router.put("/:caseId/:componentId",twelvepaneldrugabusetest.update);
router.put("/updatedataentrystatus/:caseId/:componentId",twelvepaneldrugabusetest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",twelvepaneldrugabusetest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",twelvepaneldrugabusetest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",twelvepaneldrugabusetest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",twelvepaneldrugabusetest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",twelvepaneldrugabusetest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",twelvepaneldrugabusetest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",twelvepaneldrugabusetest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",twelvepaneldrugabusetest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",twelvepaneldrugabusetest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",twelvepaneldrugabusetest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",twelvepaneldrugabusetest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",twelvepaneldrugabusetest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",twelvepaneldrugabusetest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",twelvepaneldrugabusetest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",twelvepaneldrugabusetest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",twelvepaneldrugabusetest.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",twelvepaneldrugabusetest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",twelvepaneldrugabusetest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",twelvepaneldrugabusetest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",twelvepaneldrugabusetest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",twelvepaneldrugabusetest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",twelvepaneldrugabusetest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",twelvepaneldrugabusetest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",twelvepaneldrugabusetest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",twelvepaneldrugabusetest.addNote);
router.get("/findcomponentsfor/:for",twelvepaneldrugabusetest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",twelvepaneldrugabusetest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",twelvepaneldrugabusetest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",twelvepaneldrugabusetest.reinitiateCheck);
router.post("/addquicknote", twelvepaneldrugabusetest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", twelvepaneldrugabusetest.getAllquicknoteForACheck)
module.exports = router;
