
const cibilcheck = require('../controllers/data_entry/cibilcheck.controller');
const express = require('express');
const router = express.Router();


router.post("/",cibilcheck.create);
router.get("/:case",cibilcheck.findAllForACase);
router.get("/findone/:caseId/:componentId",cibilcheck.findOne);
router.post("/uploadfile",cibilcheck.uploadFile);
router.post("/uploadproofofwork",cibilcheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",cibilcheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",cibilcheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",cibilcheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",cibilcheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",cibilcheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",cibilcheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",cibilcheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",cibilcheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",cibilcheck.readPaymentProofs);
router.put("/:caseId/:componentId",cibilcheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",cibilcheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",cibilcheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",cibilcheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",cibilcheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",cibilcheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",cibilcheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",cibilcheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",cibilcheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",cibilcheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",cibilcheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",cibilcheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",cibilcheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",cibilcheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",cibilcheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",cibilcheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",cibilcheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",cibilcheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",cibilcheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",cibilcheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",cibilcheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",cibilcheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",cibilcheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",cibilcheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",cibilcheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",cibilcheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",cibilcheck.addNote);
router.get("/findcomponentsfor/:for",cibilcheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",cibilcheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",cibilcheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",cibilcheck.reinitiateCheck);
// router.get("/",cibilcheck.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", cibilcheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", cibilcheck.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", cibilcheck.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", cibilcheck.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        