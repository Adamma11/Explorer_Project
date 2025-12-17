
const dinverification = require('../controllers/data_entry/dinverification.controller');
const express = require('express');
const router = express.Router();


router.post("/",dinverification.create);
router.get("/:case",dinverification.findAllForACase);
router.get("/findone/:caseId/:componentId",dinverification.findOne);
router.post("/uploadfile",dinverification.uploadFile);
router.post("/uploadproofofwork",dinverification.uploadProofOfWork);
router.post("/uploadpvproofofwork",dinverification.uploadPvProofOfWork);
router.post("/uploadpaymentproof",dinverification.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",dinverification.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",dinverification.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",dinverification.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",dinverification.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",dinverification.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",dinverification.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",dinverification.readPaymentProofs);
router.put("/:caseId/:componentId",dinverification.update);
router.put("/updatedataentrystatus/:caseId/:componentId",dinverification.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",dinverification.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",dinverification.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",dinverification.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",dinverification.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",dinverification.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",dinverification.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",dinverification.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",dinverification.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",dinverification.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",dinverification.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",dinverification.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",dinverification.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",dinverification.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",dinverification.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",dinverification.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",dinverification.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",dinverification.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",dinverification.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",dinverification.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",dinverification.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",dinverification.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",dinverification.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",dinverification.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",dinverification.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",dinverification.addNote);
router.get("/findcomponentsfor/:for",dinverification.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",dinverification.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",dinverification.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",dinverification.reinitiateCheck);
// router.get("/",dinverification.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", dinverification.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", dinverification.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", dinverification.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", dinverification.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        