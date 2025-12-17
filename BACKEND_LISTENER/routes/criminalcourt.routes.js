
const criminalcourt = require('../controllers/data_entry/criminalcourt.controller');
const express = require('express');
const router = express.Router();


router.post("/",criminalcourt.create);
router.get("/:case",criminalcourt.findAllForACase);
router.get("/findone/:caseId/:componentId",criminalcourt.findOne);
router.post("/uploadfile",criminalcourt.uploadFile);
router.post("/uploadproofofwork",criminalcourt.uploadProofOfWork);
router.post("/uploadpvproofofwork",criminalcourt.uploadPvProofOfWork);
router.post("/uploadpaymentproof",criminalcourt.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",criminalcourt.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalcourt.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",criminalcourt.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",criminalcourt.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalcourt.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",criminalcourt.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",criminalcourt.readPaymentProofs);
router.put("/:caseId/:componentId",criminalcourt.update);
router.put("/updatedataentrystatus/:caseId/:componentId",criminalcourt.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",criminalcourt.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",criminalcourt.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",criminalcourt.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",criminalcourt.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",criminalcourt.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",criminalcourt.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",criminalcourt.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",criminalcourt.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",criminalcourt.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",criminalcourt.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",criminalcourt.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",criminalcourt.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",criminalcourt.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",criminalcourt.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",criminalcourt.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",criminalcourt.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",criminalcourt.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",criminalcourt.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",criminalcourt.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",criminalcourt.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",criminalcourt.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",criminalcourt.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",criminalcourt.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",criminalcourt.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",criminalcourt.addNote);
router.get("/findcomponentsfor/:for",criminalcourt.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",criminalcourt.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",criminalcourt.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",criminalcourt.reinitiateCheck);
// router.get("/",criminalcourt.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", criminalcourt.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", criminalcourt.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", criminalcourt.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", criminalcourt.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        