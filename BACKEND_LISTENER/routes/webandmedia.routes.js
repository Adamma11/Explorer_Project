
const webandmedia = require('../controllers/data_entry/webandmedia.controller');
const express = require('express');
const router = express.Router();


router.post("/",webandmedia.create);
router.get("/:case",webandmedia.findAllForACase);
router.get("/findone/:caseId/:componentId",webandmedia.findOne);
router.post("/uploadfile",webandmedia.uploadFile);
router.post("/uploadproofofwork",webandmedia.uploadProofOfWork);
router.post("/uploadpvproofofwork",webandmedia.uploadPvProofOfWork);
router.post("/uploadpaymentproof",webandmedia.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",webandmedia.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",webandmedia.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",webandmedia.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",webandmedia.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",webandmedia.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",webandmedia.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",webandmedia.readPaymentProofs);
router.put("/:caseId/:componentId",webandmedia.update);
router.put("/updatedataentrystatus/:caseId/:componentId",webandmedia.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",webandmedia.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",webandmedia.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",webandmedia.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",webandmedia.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",webandmedia.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",webandmedia.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",webandmedia.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",webandmedia.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",webandmedia.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",webandmedia.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",webandmedia.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",webandmedia.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",webandmedia.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",webandmedia.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",webandmedia.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",webandmedia.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",webandmedia.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",webandmedia.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",webandmedia.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",webandmedia.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",webandmedia.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",webandmedia.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",webandmedia.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",webandmedia.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",webandmedia.addNote);
router.get("/findcomponentsfor/:for",webandmedia.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",webandmedia.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",webandmedia.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",webandmedia.reinitiateCheck);
// router.get("/",webandmedia.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", webandmedia.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", webandmedia.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", webandmedia.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", webandmedia.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        