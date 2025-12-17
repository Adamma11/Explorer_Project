
const companyverificationonline = require('../controllers/data_entry/companyverificationonline.controller');
const express = require('express');
const router = express.Router();


router.post("/",companyverificationonline.create);
router.get("/:case",companyverificationonline.findAllForACase);
router.get("/findone/:caseId/:componentId",companyverificationonline.findOne);
router.post("/uploadfile",companyverificationonline.uploadFile);
router.post("/uploadproofofwork",companyverificationonline.uploadProofOfWork);
router.post("/uploadpvproofofwork",companyverificationonline.uploadPvProofOfWork);
router.post("/uploadpaymentproof",companyverificationonline.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",companyverificationonline.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",companyverificationonline.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",companyverificationonline.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",companyverificationonline.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",companyverificationonline.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",companyverificationonline.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",companyverificationonline.readPaymentProofs);
router.put("/:caseId/:componentId",companyverificationonline.update);
router.put("/updatedataentrystatus/:caseId/:componentId",companyverificationonline.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",companyverificationonline.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",companyverificationonline.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",companyverificationonline.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",companyverificationonline.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",companyverificationonline.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",companyverificationonline.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",companyverificationonline.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",companyverificationonline.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",companyverificationonline.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",companyverificationonline.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",companyverificationonline.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",companyverificationonline.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",companyverificationonline.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",companyverificationonline.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",companyverificationonline.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",companyverificationonline.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",companyverificationonline.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",companyverificationonline.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",companyverificationonline.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",companyverificationonline.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",companyverificationonline.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",companyverificationonline.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",companyverificationonline.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",companyverificationonline.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",companyverificationonline.addNote);
router.get("/findcomponentsfor/:for",companyverificationonline.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",companyverificationonline.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",companyverificationonline.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",companyverificationonline.reinitiateCheck);
// router.get("/",companyverificationonline.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", companyverificationonline.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", companyverificationonline.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", companyverificationonline.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", companyverificationonline.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        