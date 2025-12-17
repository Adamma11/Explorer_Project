
const digitalcurrentaddress = require('../controllers/data_entry/digitalcurrentaddress.controller');
const express = require('express');
const router = express.Router();


router.post("/",digitalcurrentaddress.create);
router.get("/:case",digitalcurrentaddress.findAllForACase);
router.get("/findone/:caseId/:componentId",digitalcurrentaddress.findOne);
router.post("/uploadfile",digitalcurrentaddress.uploadFile);
router.post("/uploadproofofwork",digitalcurrentaddress.uploadProofOfWork);
router.post("/uploadpvproofofwork",digitalcurrentaddress.uploadPvProofOfWork);
router.post("/uploadpaymentproof",digitalcurrentaddress.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",digitalcurrentaddress.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",digitalcurrentaddress.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",digitalcurrentaddress.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",digitalcurrentaddress.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",digitalcurrentaddress.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",digitalcurrentaddress.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",digitalcurrentaddress.readPaymentProofs);
router.put("/:caseId/:componentId",digitalcurrentaddress.update);
router.put("/updatedataentrystatus/:caseId/:componentId",digitalcurrentaddress.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",digitalcurrentaddress.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",digitalcurrentaddress.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",digitalcurrentaddress.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",digitalcurrentaddress.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",digitalcurrentaddress.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",digitalcurrentaddress.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",digitalcurrentaddress.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",digitalcurrentaddress.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",digitalcurrentaddress.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",digitalcurrentaddress.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",digitalcurrentaddress.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",digitalcurrentaddress.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",digitalcurrentaddress.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",digitalcurrentaddress.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",digitalcurrentaddress.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",digitalcurrentaddress.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",digitalcurrentaddress.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",digitalcurrentaddress.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",digitalcurrentaddress.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",digitalcurrentaddress.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",digitalcurrentaddress.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",digitalcurrentaddress.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",digitalcurrentaddress.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",digitalcurrentaddress.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",digitalcurrentaddress.addNote);
router.get("/findcomponentsfor/:for",digitalcurrentaddress.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",digitalcurrentaddress.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",digitalcurrentaddress.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",digitalcurrentaddress.reinitiateCheck);
// router.get("/",digitalcurrentaddress.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", digitalcurrentaddress.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", digitalcurrentaddress.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", digitalcurrentaddress.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", digitalcurrentaddress.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        