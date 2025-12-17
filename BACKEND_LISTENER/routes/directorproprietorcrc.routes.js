
const directorproprietorcrc = require('../controllers/data_entry/directorproprietorcrc.controller');
const express = require('express');
const router = express.Router();


router.post("/",directorproprietorcrc.create);
router.get("/:case",directorproprietorcrc.findAllForACase);
router.get("/findone/:caseId/:componentId",directorproprietorcrc.findOne);
router.post("/uploadfile",directorproprietorcrc.uploadFile);
router.post("/uploadproofofwork",directorproprietorcrc.uploadProofOfWork);
router.post("/uploadpvproofofwork",directorproprietorcrc.uploadPvProofOfWork);
router.post("/uploadpaymentproof",directorproprietorcrc.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",directorproprietorcrc.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorproprietorcrc.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",directorproprietorcrc.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",directorproprietorcrc.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorproprietorcrc.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",directorproprietorcrc.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",directorproprietorcrc.readPaymentProofs);
router.put("/:caseId/:componentId",directorproprietorcrc.update);
router.put("/updatedataentrystatus/:caseId/:componentId",directorproprietorcrc.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",directorproprietorcrc.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",directorproprietorcrc.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",directorproprietorcrc.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",directorproprietorcrc.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",directorproprietorcrc.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",directorproprietorcrc.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",directorproprietorcrc.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",directorproprietorcrc.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",directorproprietorcrc.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",directorproprietorcrc.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",directorproprietorcrc.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",directorproprietorcrc.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",directorproprietorcrc.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",directorproprietorcrc.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",directorproprietorcrc.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",directorproprietorcrc.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",directorproprietorcrc.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",directorproprietorcrc.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",directorproprietorcrc.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",directorproprietorcrc.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",directorproprietorcrc.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",directorproprietorcrc.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",directorproprietorcrc.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",directorproprietorcrc.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",directorproprietorcrc.addNote);
router.get("/findcomponentsfor/:for",directorproprietorcrc.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",directorproprietorcrc.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",directorproprietorcrc.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",directorproprietorcrc.reinitiateCheck);
// router.get("/",directorproprietorcrc.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", directorproprietorcrc.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", directorproprietorcrc.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", directorproprietorcrc.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", directorproprietorcrc.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        