
const directorproprietoridentity = require('../controllers/data_entry/directorproprietoridentity.controller');
const express = require('express');
const router = express.Router();


router.post("/",directorproprietoridentity.create);
router.get("/:case",directorproprietoridentity.findAllForACase);
router.get("/findone/:caseId/:componentId",directorproprietoridentity.findOne);
router.post("/uploadfile",directorproprietoridentity.uploadFile);
router.post("/uploadproofofwork",directorproprietoridentity.uploadProofOfWork);
router.post("/uploadpvproofofwork",directorproprietoridentity.uploadPvProofOfWork);
router.post("/uploadpaymentproof",directorproprietoridentity.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",directorproprietoridentity.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorproprietoridentity.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",directorproprietoridentity.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",directorproprietoridentity.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorproprietoridentity.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",directorproprietoridentity.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",directorproprietoridentity.readPaymentProofs);
router.put("/:caseId/:componentId",directorproprietoridentity.update);
router.put("/updatedataentrystatus/:caseId/:componentId",directorproprietoridentity.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",directorproprietoridentity.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",directorproprietoridentity.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",directorproprietoridentity.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",directorproprietoridentity.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",directorproprietoridentity.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",directorproprietoridentity.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",directorproprietoridentity.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",directorproprietoridentity.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",directorproprietoridentity.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",directorproprietoridentity.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",directorproprietoridentity.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",directorproprietoridentity.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",directorproprietoridentity.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",directorproprietoridentity.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",directorproprietoridentity.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",directorproprietoridentity.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",directorproprietoridentity.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",directorproprietoridentity.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",directorproprietoridentity.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",directorproprietoridentity.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",directorproprietoridentity.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",directorproprietoridentity.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",directorproprietoridentity.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",directorproprietoridentity.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",directorproprietoridentity.addNote);
router.get("/findcomponentsfor/:for",directorproprietoridentity.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",directorproprietoridentity.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",directorproprietoridentity.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",directorproprietoridentity.reinitiateCheck);
// router.get("/",directorproprietoridentity.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", directorproprietoridentity.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", directorproprietoridentity.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", directorproprietoridentity.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", directorproprietoridentity.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        