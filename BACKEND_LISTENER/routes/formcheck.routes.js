
const formcheck = require('../controllers/data_entry/formcheck.controller');
const express = require('express');
const router = express.Router();


router.post("/",formcheck.create);
router.get("/:case",formcheck.findAllForACase);
router.get("/findone/:caseId/:componentId",formcheck.findOne);
router.post("/uploadfile",formcheck.uploadFile);
router.post("/uploadproofofwork",formcheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",formcheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",formcheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",formcheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",formcheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",formcheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",formcheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",formcheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",formcheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",formcheck.readPaymentProofs);
router.put("/:caseId/:componentId",formcheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",formcheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",formcheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",formcheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",formcheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",formcheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",formcheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",formcheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",formcheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",formcheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",formcheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",formcheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",formcheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",formcheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",formcheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",formcheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",formcheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",formcheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",formcheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",formcheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",formcheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",formcheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",formcheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",formcheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",formcheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",formcheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",formcheck.addNote);
router.get("/findcomponentsfor/:for",formcheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",formcheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",formcheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",formcheck.reinitiateCheck);
// router.get("/",formcheck.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", formcheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", formcheck.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", formcheck.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", formcheck.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        