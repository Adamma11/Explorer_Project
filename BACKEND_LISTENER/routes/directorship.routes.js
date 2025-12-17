
const directorship = require('../controllers/data_entry/directorship.controller');
const express = require('express');
const router = express.Router();


router.post("/",directorship.create);
router.get("/:case",directorship.findAllForACase);
router.get("/findone/:caseId/:componentId",directorship.findOne);
router.post("/uploadfile",directorship.uploadFile);
router.post("/uploadproofofwork",directorship.uploadProofOfWork);
router.post("/uploadpvproofofwork",directorship.uploadPvProofOfWork);
router.post("/uploadpaymentproof",directorship.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",directorship.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorship.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",directorship.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",directorship.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorship.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",directorship.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",directorship.readPaymentProofs);
router.put("/:caseId/:componentId",directorship.update);
router.put("/updatedataentrystatus/:caseId/:componentId",directorship.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",directorship.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",directorship.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",directorship.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",directorship.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",directorship.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",directorship.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",directorship.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",directorship.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",directorship.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",directorship.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",directorship.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",directorship.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",directorship.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",directorship.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",directorship.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",directorship.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",directorship.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",directorship.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",directorship.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",directorship.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",directorship.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",directorship.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",directorship.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",directorship.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",directorship.addNote);
router.get("/findcomponentsfor/:for",directorship.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",directorship.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",directorship.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",directorship.reinitiateCheck);
// router.get("/",directorship.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", directorship.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", directorship.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", directorship.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", directorship.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        