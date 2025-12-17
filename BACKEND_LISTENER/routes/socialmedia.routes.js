
const socialmedia = require('../controllers/data_entry/socialmedia.controller');
const express = require('express');
const router = express.Router();


router.post("/",socialmedia.create);
router.get("/:case",socialmedia.findAllForACase);
router.get("/findone/:caseId/:componentId",socialmedia.findOne);
router.post("/uploadfile",socialmedia.uploadFile);
router.post("/uploadproofofwork",socialmedia.uploadProofOfWork);
router.post("/uploadpvproofofwork",socialmedia.uploadPvProofOfWork);
router.post("/uploadpaymentproof",socialmedia.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",socialmedia.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",socialmedia.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",socialmedia.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",socialmedia.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",socialmedia.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",socialmedia.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",socialmedia.readPaymentProofs);
router.put("/:caseId/:componentId",socialmedia.update);
router.put("/updatedataentrystatus/:caseId/:componentId",socialmedia.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",socialmedia.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",socialmedia.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",socialmedia.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",socialmedia.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",socialmedia.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",socialmedia.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",socialmedia.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",socialmedia.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",socialmedia.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",socialmedia.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",socialmedia.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",socialmedia.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",socialmedia.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",socialmedia.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",socialmedia.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",socialmedia.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",socialmedia.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",socialmedia.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",socialmedia.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",socialmedia.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",socialmedia.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",socialmedia.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",socialmedia.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",socialmedia.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",socialmedia.addNote);
router.get("/findcomponentsfor/:for",socialmedia.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",socialmedia.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",socialmedia.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",socialmedia.reinitiateCheck);
// router.get("/",socialmedia.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", socialmedia.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", socialmedia.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", socialmedia.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", socialmedia.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        