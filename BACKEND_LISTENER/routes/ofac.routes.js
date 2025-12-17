
const ofac = require('../controllers/data_entry/ofac.controller');
const express = require('express');
const router = express.Router();


router.post("/",ofac.create);
router.get("/:case",ofac.findAllForACase);
router.get("/findone/:caseId/:componentId",ofac.findOne);
router.post("/uploadfile",ofac.uploadFile);
router.post("/uploadproofofwork",ofac.uploadProofOfWork);
router.post("/uploadpvproofofwork",ofac.uploadPvProofOfWork);
router.post("/uploadpaymentproof",ofac.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",ofac.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",ofac.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",ofac.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",ofac.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",ofac.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",ofac.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",ofac.readPaymentProofs);
router.put("/:caseId/:componentId",ofac.update);
router.put("/updatedataentrystatus/:caseId/:componentId",ofac.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",ofac.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",ofac.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",ofac.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",ofac.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",ofac.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",ofac.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",ofac.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",ofac.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",ofac.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",ofac.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",ofac.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",ofac.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",ofac.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",ofac.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",ofac.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",ofac.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",ofac.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",ofac.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",ofac.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",ofac.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",ofac.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",ofac.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",ofac.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",ofac.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",ofac.addNote);
router.get("/findcomponentsfor/:for",ofac.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",ofac.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",ofac.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",ofac.reinitiateCheck);
// router.get("/",ofac.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", ofac.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", ofac.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", ofac.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", ofac.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        