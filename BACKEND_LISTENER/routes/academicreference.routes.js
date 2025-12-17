
const academicreference = require('../controllers/data_entry/academicreference.controller');
const express = require('express');
const router = express.Router();


router.post("/",academicreference.create);
router.get("/:case",academicreference.findAllForACase);
router.get("/findone/:caseId/:componentId",academicreference.findOne);
router.post("/uploadfile",academicreference.uploadFile);
router.post("/uploadproofofwork",academicreference.uploadProofOfWork);
router.post("/uploadpvproofofwork",academicreference.uploadPvProofOfWork);
router.post("/uploadpaymentproof",academicreference.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",academicreference.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",academicreference.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",academicreference.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",academicreference.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",academicreference.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",academicreference.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",academicreference.readPaymentProofs);
router.put("/:caseId/:componentId",academicreference.update);
router.put("/updatedataentrystatus/:caseId/:componentId",academicreference.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",academicreference.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",academicreference.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",academicreference.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",academicreference.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",academicreference.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",academicreference.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",academicreference.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",academicreference.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",academicreference.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",academicreference.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",academicreference.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",academicreference.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",academicreference.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",academicreference.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",academicreference.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",academicreference.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",academicreference.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",academicreference.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",academicreference.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",academicreference.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",academicreference.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",academicreference.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",academicreference.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",academicreference.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",academicreference.addNote);
router.get("/findcomponentsfor/:for",academicreference.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",academicreference.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",academicreference.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",academicreference.reinitiateCheck);
// router.get("/",academicreference.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", academicreference.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", academicreference.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", academicreference.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", academicreference.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        