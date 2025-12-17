
const kyc = require('../controllers/data_entry/kyc.controller');
const express = require('express');
const router = express.Router();


router.post("/",kyc.create);
router.get("/:case",kyc.findAllForACase);
router.get("/findone/:caseId/:componentId",kyc.findOne);
router.post("/uploadfile",kyc.uploadFile);
router.post("/uploadproofofwork",kyc.uploadProofOfWork);
router.post("/uploadpvproofofwork",kyc.uploadPvProofOfWork);
router.post("/uploadpaymentproof",kyc.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",kyc.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",kyc.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",kyc.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",kyc.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",kyc.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",kyc.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",kyc.readPaymentProofs);
router.put("/:caseId/:componentId",kyc.update);
router.put("/updatedataentrystatus/:caseId/:componentId",kyc.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",kyc.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",kyc.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",kyc.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",kyc.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",kyc.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",kyc.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",kyc.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",kyc.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",kyc.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",kyc.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",kyc.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",kyc.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",kyc.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",kyc.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",kyc.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",kyc.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",kyc.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",kyc.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",kyc.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",kyc.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",kyc.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",kyc.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",kyc.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",kyc.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",kyc.addNote);
router.get("/findcomponentsfor/:for",kyc.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",kyc.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",kyc.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",kyc.reinitiateCheck);
// router.get("/",kyc.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", kyc.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", kyc.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", kyc.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", kyc.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        