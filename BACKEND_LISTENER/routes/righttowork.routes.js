
const righttowork = require('../controllers/data_entry/righttowork.controller');
const express = require('express');
const router = express.Router();


router.post("/",righttowork.create);
router.get("/:case",righttowork.findAllForACase);
router.get("/findone/:caseId/:componentId",righttowork.findOne);
router.post("/uploadfile",righttowork.uploadFile);
router.post("/uploadproofofwork",righttowork.uploadProofOfWork);
router.post("/uploadpvproofofwork",righttowork.uploadPvProofOfWork);
router.post("/uploadpaymentproof",righttowork.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",righttowork.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",righttowork.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",righttowork.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",righttowork.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",righttowork.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",righttowork.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",righttowork.readPaymentProofs);
router.put("/:caseId/:componentId",righttowork.update);
router.put("/updatedataentrystatus/:caseId/:componentId",righttowork.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",righttowork.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",righttowork.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",righttowork.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",righttowork.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",righttowork.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",righttowork.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",righttowork.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",righttowork.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",righttowork.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",righttowork.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",righttowork.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",righttowork.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",righttowork.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",righttowork.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",righttowork.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",righttowork.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",righttowork.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",righttowork.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",righttowork.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",righttowork.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",righttowork.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",righttowork.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",righttowork.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",righttowork.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",righttowork.addNote);
router.get("/findcomponentsfor/:for",righttowork.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",righttowork.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",righttowork.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",righttowork.reinitiateCheck);
// router.get("/",righttowork.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", righttowork.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", righttowork.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", righttowork.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", righttowork.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        