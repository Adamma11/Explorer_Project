
const companyverificationphysical = require('../controllers/data_entry/companyverificationphysical.controller');
const express = require('express');
const router = express.Router();


router.post("/",companyverificationphysical.create);
router.get("/:case",companyverificationphysical.findAllForACase);
router.get("/findone/:caseId/:componentId",companyverificationphysical.findOne);
router.post("/uploadfile",companyverificationphysical.uploadFile);
router.post("/uploadproofofwork",companyverificationphysical.uploadProofOfWork);
router.post("/uploadpvproofofwork",companyverificationphysical.uploadPvProofOfWork);
router.post("/uploadpaymentproof",companyverificationphysical.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",companyverificationphysical.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",companyverificationphysical.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",companyverificationphysical.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",companyverificationphysical.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",companyverificationphysical.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",companyverificationphysical.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",companyverificationphysical.readPaymentProofs);
router.put("/:caseId/:componentId",companyverificationphysical.update);
router.put("/updatedataentrystatus/:caseId/:componentId",companyverificationphysical.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",companyverificationphysical.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",companyverificationphysical.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",companyverificationphysical.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",companyverificationphysical.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",companyverificationphysical.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",companyverificationphysical.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",companyverificationphysical.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",companyverificationphysical.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",companyverificationphysical.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",companyverificationphysical.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",companyverificationphysical.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",companyverificationphysical.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",companyverificationphysical.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",companyverificationphysical.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",companyverificationphysical.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",companyverificationphysical.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",companyverificationphysical.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",companyverificationphysical.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",companyverificationphysical.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",companyverificationphysical.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",companyverificationphysical.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",companyverificationphysical.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",companyverificationphysical.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",companyverificationphysical.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",companyverificationphysical.addNote);
router.get("/findcomponentsfor/:for",companyverificationphysical.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",companyverificationphysical.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",companyverificationphysical.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",companyverificationphysical.reinitiateCheck);
// router.get("/",companyverificationphysical.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", companyverificationphysical.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", companyverificationphysical.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", companyverificationphysical.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", companyverificationphysical.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        