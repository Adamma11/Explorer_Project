
const cpc = require('../controllers/data_entry/cpc.controller');
const express = require('express');
const router = express.Router();


router.post("/",cpc.create);
router.get("/:case",cpc.findAllForACase);
router.get("/findone/:caseId/:componentId",cpc.findOne);
router.post("/uploadfile",cpc.uploadFile);
router.post("/uploadproofofwork",cpc.uploadProofOfWork);
router.post("/uploadpvproofofwork",cpc.uploadPvProofOfWork);
router.post("/uploadpaymentproof",cpc.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",cpc.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",cpc.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",cpc.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",cpc.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",cpc.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",cpc.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",cpc.readPaymentProofs);
router.put("/:caseId/:componentId",cpc.update);
router.put("/updatedataentrystatus/:caseId/:componentId",cpc.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",cpc.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",cpc.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",cpc.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",cpc.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",cpc.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",cpc.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",cpc.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",cpc.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",cpc.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",cpc.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",cpc.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",cpc.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",cpc.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",cpc.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",cpc.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",cpc.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",cpc.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",cpc.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",cpc.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",cpc.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",cpc.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",cpc.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",cpc.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",cpc.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",cpc.addNote);
router.get("/findcomponentsfor/:for",cpc.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",cpc.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",cpc.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",cpc.reinitiateCheck);
// router.get("/",cpc.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", cpc.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", cpc.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", cpc.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", cpc.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        