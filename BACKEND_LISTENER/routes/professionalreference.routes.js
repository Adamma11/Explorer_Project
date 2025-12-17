
const professionalreference = require('../controllers/data_entry/professionalreference.controller');
const express = require('express');
const router = express.Router();


router.post("/",professionalreference.create);
router.get("/:case",professionalreference.findAllForACase);
router.get("/findone/:caseId/:componentId",professionalreference.findOne);
router.post("/uploadfile",professionalreference.uploadFile);
router.post("/uploadproofofwork",professionalreference.uploadProofOfWork);
router.post("/uploadpvproofofwork",professionalreference.uploadPvProofOfWork);
router.post("/uploadpaymentproof",professionalreference.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",professionalreference.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",professionalreference.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",professionalreference.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",professionalreference.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",professionalreference.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",professionalreference.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",professionalreference.readPaymentProofs);
router.put("/:caseId/:componentId",professionalreference.update);
router.put("/updatedataentrystatus/:caseId/:componentId",professionalreference.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",professionalreference.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",professionalreference.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",professionalreference.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",professionalreference.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",professionalreference.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",professionalreference.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",professionalreference.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",professionalreference.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",professionalreference.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",professionalreference.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",professionalreference.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",professionalreference.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",professionalreference.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",professionalreference.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",professionalreference.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",professionalreference.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",professionalreference.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",professionalreference.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",professionalreference.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",professionalreference.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",professionalreference.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",professionalreference.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",professionalreference.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",professionalreference.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",professionalreference.addNote);
router.get("/findcomponentsfor/:for",professionalreference.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",professionalreference.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",professionalreference.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",professionalreference.reinitiateCheck);
// router.get("/",professionalreference.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", professionalreference.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", professionalreference.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", professionalreference.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", professionalreference.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        