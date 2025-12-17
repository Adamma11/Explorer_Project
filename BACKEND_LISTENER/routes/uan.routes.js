
const uan = require('../controllers/data_entry/uan.controller');
const express = require('express');
const router = express.Router();


router.post("/",uan.create);
router.get("/:case",uan.findAllForACase);
router.get("/findone/:caseId/:componentId",uan.findOne);
router.post("/uploadfile",uan.uploadFile);
router.post("/uploadproofofwork",uan.uploadProofOfWork);
router.post("/uploadpvproofofwork",uan.uploadPvProofOfWork);
router.post("/uploadpaymentproof",uan.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",uan.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",uan.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",uan.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",uan.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",uan.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",uan.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",uan.readPaymentProofs);
router.put("/:caseId/:componentId",uan.update);
router.put("/updatedataentrystatus/:caseId/:componentId",uan.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",uan.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",uan.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",uan.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",uan.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",uan.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",uan.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",uan.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",uan.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",uan.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",uan.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",uan.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",uan.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",uan.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",uan.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",uan.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",uan.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",uan.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",uan.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",uan.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",uan.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",uan.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",uan.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",uan.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",uan.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",uan.addNote);
router.get("/findcomponentsfor/:for",uan.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",uan.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",uan.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",uan.reinitiateCheck);
// router.get("/",uan.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", uan.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", uan.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", uan.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", uan.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        