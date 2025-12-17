
const identityanddigital = require('../controllers/data_entry/identityanddigital.controller');
const express = require('express');
const router = express.Router();


router.post("/",identityanddigital.create);
router.get("/:case",identityanddigital.findAllForACase);
router.get("/findone/:caseId/:componentId",identityanddigital.findOne);
router.post("/uploadfile",identityanddigital.uploadFile);
router.post("/uploadproofofwork",identityanddigital.uploadProofOfWork);
router.post("/uploadpvproofofwork",identityanddigital.uploadPvProofOfWork);
router.post("/uploadpaymentproof",identityanddigital.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",identityanddigital.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",identityanddigital.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",identityanddigital.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",identityanddigital.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",identityanddigital.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",identityanddigital.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",identityanddigital.readPaymentProofs);
router.put("/:caseId/:componentId",identityanddigital.update);
router.put("/updatedataentrystatus/:caseId/:componentId",identityanddigital.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",identityanddigital.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",identityanddigital.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",identityanddigital.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",identityanddigital.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",identityanddigital.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",identityanddigital.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",identityanddigital.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",identityanddigital.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",identityanddigital.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",identityanddigital.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",identityanddigital.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",identityanddigital.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",identityanddigital.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",identityanddigital.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",identityanddigital.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",identityanddigital.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",identityanddigital.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",identityanddigital.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",identityanddigital.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",identityanddigital.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",identityanddigital.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",identityanddigital.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",identityanddigital.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",identityanddigital.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",identityanddigital.addNote);
router.get("/findcomponentsfor/:for",identityanddigital.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",identityanddigital.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",identityanddigital.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",identityanddigital.reinitiateCheck);
// router.get("/",identityanddigital.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", identityanddigital.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", identityanddigital.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", identityanddigital.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", identityanddigital.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        