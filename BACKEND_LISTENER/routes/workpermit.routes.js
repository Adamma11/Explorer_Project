
const workpermit = require('../controllers/data_entry/workpermit.controller');
const express = require('express');
const router = express.Router();


router.post("/",workpermit.create);
router.get("/:case",workpermit.findAllForACase);
router.get("/findone/:caseId/:componentId",workpermit.findOne);
router.post("/uploadfile",workpermit.uploadFile);
router.post("/uploadproofofwork",workpermit.uploadProofOfWork);
router.post("/uploadpvproofofwork",workpermit.uploadPvProofOfWork);
router.post("/uploadpaymentproof",workpermit.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",workpermit.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",workpermit.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",workpermit.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",workpermit.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",workpermit.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",workpermit.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",workpermit.readPaymentProofs);
router.put("/:caseId/:componentId",workpermit.update);
router.put("/updatedataentrystatus/:caseId/:componentId",workpermit.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",workpermit.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",workpermit.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",workpermit.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",workpermit.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",workpermit.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",workpermit.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",workpermit.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",workpermit.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",workpermit.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",workpermit.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",workpermit.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",workpermit.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",workpermit.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",workpermit.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",workpermit.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",workpermit.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",workpermit.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",workpermit.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",workpermit.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",workpermit.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",workpermit.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",workpermit.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",workpermit.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",workpermit.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",workpermit.addNote);
router.get("/findcomponentsfor/:for",workpermit.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",workpermit.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",workpermit.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",workpermit.reinitiateCheck);
// router.get("/",workpermit.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", workpermit.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", workpermit.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", workpermit.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", workpermit.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        