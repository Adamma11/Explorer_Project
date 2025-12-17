
const currentaddress = require('../controllers/data_entry/currentaddress.controller');
const express = require('express');
const router = express.Router();


router.post("/",currentaddress.create);
router.get("/:case",currentaddress.findAllForACase);
router.get("/findone/:caseId/:componentId",currentaddress.findOne);
router.post("/uploadfile",currentaddress.uploadFile);
router.post("/uploadproofofwork",currentaddress.uploadProofOfWork);
router.post("/uploadpvproofofwork",currentaddress.uploadPvProofOfWork);
router.post("/uploadpaymentproof",currentaddress.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",currentaddress.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",currentaddress.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",currentaddress.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",currentaddress.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",currentaddress.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",currentaddress.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",currentaddress.readPaymentProofs);
router.put("/:caseId/:componentId",currentaddress.update);
router.put("/updatedataentrystatus/:caseId/:componentId",currentaddress.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",currentaddress.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",currentaddress.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",currentaddress.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",currentaddress.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",currentaddress.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",currentaddress.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",currentaddress.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",currentaddress.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",currentaddress.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",currentaddress.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",currentaddress.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",currentaddress.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",currentaddress.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",currentaddress.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",currentaddress.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",currentaddress.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",currentaddress.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",currentaddress.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",currentaddress.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",currentaddress.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",currentaddress.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",currentaddress.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",currentaddress.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",currentaddress.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",currentaddress.addNote);
router.get("/findcomponentsfor/:for",currentaddress.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",currentaddress.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",currentaddress.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",currentaddress.reinitiateCheck);
// router.get("/",currentaddress.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", currentaddress.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", currentaddress.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", currentaddress.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", currentaddress.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        