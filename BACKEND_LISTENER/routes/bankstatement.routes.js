
const bankstatement = require('../controllers/data_entry/bankstatement.controller');
const express = require('express');
const router = express.Router();


router.post("/",bankstatement.create);
router.get("/:case",bankstatement.findAllForACase);
router.get("/findone/:caseId/:componentId",bankstatement.findOne);
router.post("/uploadfile",bankstatement.uploadFile);
router.post("/uploadproofofwork",bankstatement.uploadProofOfWork);
router.post("/uploadpvproofofwork",bankstatement.uploadPvProofOfWork);
router.post("/uploadpaymentproof",bankstatement.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",bankstatement.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",bankstatement.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",bankstatement.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",bankstatement.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",bankstatement.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",bankstatement.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",bankstatement.readPaymentProofs);
router.put("/:caseId/:componentId",bankstatement.update);
router.put("/updatedataentrystatus/:caseId/:componentId",bankstatement.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",bankstatement.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",bankstatement.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",bankstatement.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",bankstatement.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",bankstatement.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",bankstatement.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",bankstatement.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",bankstatement.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",bankstatement.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",bankstatement.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",bankstatement.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",bankstatement.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",bankstatement.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",bankstatement.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",bankstatement.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",bankstatement.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",bankstatement.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",bankstatement.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",bankstatement.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",bankstatement.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",bankstatement.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",bankstatement.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",bankstatement.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",bankstatement.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",bankstatement.addNote);
router.get("/findcomponentsfor/:for",bankstatement.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",bankstatement.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",bankstatement.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",bankstatement.reinitiateCheck);
// router.get("/",bankstatement.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", bankstatement.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", bankstatement.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", bankstatement.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", bankstatement.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        