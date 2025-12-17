
const testidentity = require('../controllers/data_entry/testidentity.controller');
const express = require('express');
const router = express.Router();


router.post("/",testidentity.create);
router.get("/:case",testidentity.findAllForACase);
router.get("/findone/:caseId/:componentId",testidentity.findOne);
router.post("/uploadfile",testidentity.uploadFile);
router.post("/uploadproofofwork",testidentity.uploadProofOfWork);
router.post("/uploadpvproofofwork",testidentity.uploadPvProofOfWork);
router.post("/uploadpaymentproof",testidentity.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",testidentity.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",testidentity.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",testidentity.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",testidentity.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",testidentity.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",testidentity.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",testidentity.readPaymentProofs);
router.put("/:caseId/:componentId",testidentity.update);
router.put("/updatedataentrystatus/:caseId/:componentId",testidentity.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",testidentity.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",testidentity.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",testidentity.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",testidentity.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",testidentity.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",testidentity.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",testidentity.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",testidentity.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",testidentity.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",testidentity.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",testidentity.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",testidentity.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",testidentity.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",testidentity.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",testidentity.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",testidentity.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",testidentity.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",testidentity.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",testidentity.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",testidentity.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",testidentity.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",testidentity.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",testidentity.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",testidentity.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",testidentity.addNote);
router.get("/findcomponentsfor/:for",testidentity.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",testidentity.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",testidentity.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",testidentity.reinitiateCheck);
// router.get("/",testidentity.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", testidentity.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", testidentity.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", testidentity.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", testidentity.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        