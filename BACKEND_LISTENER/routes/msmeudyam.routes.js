
const msmeudyam = require('../controllers/data_entry/msmeudyam.controller');
const express = require('express');
const router = express.Router();


router.post("/",msmeudyam.create);
router.get("/:case",msmeudyam.findAllForACase);
router.get("/findone/:caseId/:componentId",msmeudyam.findOne);
router.post("/uploadfile",msmeudyam.uploadFile);
router.post("/uploadproofofwork",msmeudyam.uploadProofOfWork);
router.post("/uploadpvproofofwork",msmeudyam.uploadPvProofOfWork);
router.post("/uploadpaymentproof",msmeudyam.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",msmeudyam.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",msmeudyam.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",msmeudyam.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",msmeudyam.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",msmeudyam.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",msmeudyam.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",msmeudyam.readPaymentProofs);
router.put("/:caseId/:componentId",msmeudyam.update);
router.put("/updatedataentrystatus/:caseId/:componentId",msmeudyam.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",msmeudyam.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",msmeudyam.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",msmeudyam.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",msmeudyam.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",msmeudyam.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",msmeudyam.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",msmeudyam.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",msmeudyam.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",msmeudyam.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",msmeudyam.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",msmeudyam.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",msmeudyam.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",msmeudyam.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",msmeudyam.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",msmeudyam.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",msmeudyam.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",msmeudyam.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",msmeudyam.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",msmeudyam.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",msmeudyam.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",msmeudyam.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",msmeudyam.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",msmeudyam.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",msmeudyam.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",msmeudyam.addNote);
router.get("/findcomponentsfor/:for",msmeudyam.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",msmeudyam.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",msmeudyam.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",msmeudyam.reinitiateCheck);
// router.get("/",msmeudyam.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", msmeudyam.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", msmeudyam.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", msmeudyam.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", msmeudyam.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        