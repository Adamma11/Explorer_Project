
const referenceabe = require('../controllers/data_entry/referenceabe.controller');
const express = require('express');
const router = express.Router();


router.post("/",referenceabe.create);
router.get("/:case",referenceabe.findAllForACase);
router.get("/findone/:caseId/:componentId",referenceabe.findOne);
router.post("/uploadfile",referenceabe.uploadFile);
router.post("/uploadproofofwork",referenceabe.uploadProofOfWork);
router.post("/uploadpvproofofwork",referenceabe.uploadPvProofOfWork);
router.post("/uploadpaymentproof",referenceabe.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",referenceabe.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",referenceabe.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",referenceabe.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",referenceabe.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",referenceabe.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",referenceabe.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",referenceabe.readPaymentProofs);
router.put("/:caseId/:componentId",referenceabe.update);
router.put("/updatedataentrystatus/:caseId/:componentId",referenceabe.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",referenceabe.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",referenceabe.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",referenceabe.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",referenceabe.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",referenceabe.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",referenceabe.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",referenceabe.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",referenceabe.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",referenceabe.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",referenceabe.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",referenceabe.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",referenceabe.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",referenceabe.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",referenceabe.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",referenceabe.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",referenceabe.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",referenceabe.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",referenceabe.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",referenceabe.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",referenceabe.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",referenceabe.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",referenceabe.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",referenceabe.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",referenceabe.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",referenceabe.addNote);
router.get("/findcomponentsfor/:for",referenceabe.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",referenceabe.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",referenceabe.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",referenceabe.reinitiateCheck);
// router.get("/",referenceabe.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", referenceabe.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", referenceabe.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", referenceabe.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", referenceabe.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        