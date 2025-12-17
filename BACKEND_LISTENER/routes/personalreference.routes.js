
const personalreference = require('../controllers/data_entry/personalreference.controller');
const express = require('express');
const router = express.Router();


router.post("/",personalreference.create);
router.get("/:case",personalreference.findAllForACase);
router.get("/findone/:caseId/:componentId",personalreference.findOne);
router.post("/uploadfile",personalreference.uploadFile);
router.post("/uploadproofofwork",personalreference.uploadProofOfWork);
router.post("/uploadpvproofofwork",personalreference.uploadPvProofOfWork);
router.post("/uploadpaymentproof",personalreference.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",personalreference.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",personalreference.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",personalreference.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",personalreference.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",personalreference.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",personalreference.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",personalreference.readPaymentProofs);
router.put("/:caseId/:componentId",personalreference.update);
router.put("/updatedataentrystatus/:caseId/:componentId",personalreference.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",personalreference.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",personalreference.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",personalreference.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",personalreference.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",personalreference.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",personalreference.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",personalreference.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",personalreference.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",personalreference.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",personalreference.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",personalreference.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",personalreference.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",personalreference.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",personalreference.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",personalreference.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",personalreference.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",personalreference.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",personalreference.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",personalreference.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",personalreference.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",personalreference.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",personalreference.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",personalreference.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",personalreference.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",personalreference.addNote);
router.get("/findcomponentsfor/:for",personalreference.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",personalreference.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",personalreference.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",personalreference.reinitiateCheck);
// router.get("/",personalreference.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", personalreference.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", personalreference.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", personalreference.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", personalreference.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        