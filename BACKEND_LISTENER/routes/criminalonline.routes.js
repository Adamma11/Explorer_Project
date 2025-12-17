
const criminalonline = require('../controllers/data_entry/criminalonline.controller');
const express = require('express');
const router = express.Router();


router.post("/",criminalonline.create);
router.get("/:case",criminalonline.findAllForACase);
router.get("/findone/:caseId/:componentId",criminalonline.findOne);
router.post("/uploadfile",criminalonline.uploadFile);
router.post("/uploadproofofwork",criminalonline.uploadProofOfWork);
router.post("/uploadpvproofofwork",criminalonline.uploadPvProofOfWork);
router.post("/uploadpaymentproof",criminalonline.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",criminalonline.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalonline.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",criminalonline.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",criminalonline.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalonline.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",criminalonline.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",criminalonline.readPaymentProofs);
router.put("/:caseId/:componentId",criminalonline.update);
router.put("/updatedataentrystatus/:caseId/:componentId",criminalonline.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",criminalonline.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",criminalonline.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",criminalonline.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",criminalonline.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",criminalonline.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",criminalonline.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",criminalonline.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",criminalonline.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",criminalonline.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",criminalonline.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",criminalonline.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",criminalonline.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",criminalonline.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",criminalonline.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",criminalonline.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",criminalonline.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",criminalonline.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",criminalonline.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",criminalonline.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",criminalonline.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",criminalonline.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",criminalonline.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",criminalonline.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",criminalonline.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",criminalonline.addNote);
router.get("/findcomponentsfor/:for",criminalonline.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",criminalonline.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",criminalonline.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",criminalonline.reinitiateCheck);
// router.get("/",criminalonline.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", criminalonline.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", criminalonline.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", criminalonline.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", criminalonline.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        