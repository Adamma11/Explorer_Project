
const criminalwritten = require('../controllers/data_entry/criminalwritten.controller');
const express = require('express');
const router = express.Router();


router.post("/",criminalwritten.create);
router.get("/:case",criminalwritten.findAllForACase);
router.get("/findone/:caseId/:componentId",criminalwritten.findOne);
router.post("/uploadfile",criminalwritten.uploadFile);
router.post("/uploadproofofwork",criminalwritten.uploadProofOfWork);
router.post("/uploadpvproofofwork",criminalwritten.uploadPvProofOfWork);
router.post("/uploadpaymentproof",criminalwritten.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",criminalwritten.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalwritten.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",criminalwritten.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",criminalwritten.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalwritten.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",criminalwritten.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",criminalwritten.readPaymentProofs);
router.put("/:caseId/:componentId",criminalwritten.update);
router.put("/updatedataentrystatus/:caseId/:componentId",criminalwritten.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",criminalwritten.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",criminalwritten.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",criminalwritten.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",criminalwritten.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",criminalwritten.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",criminalwritten.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",criminalwritten.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",criminalwritten.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",criminalwritten.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",criminalwritten.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",criminalwritten.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",criminalwritten.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",criminalwritten.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",criminalwritten.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",criminalwritten.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",criminalwritten.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",criminalwritten.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",criminalwritten.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",criminalwritten.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",criminalwritten.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",criminalwritten.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",criminalwritten.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",criminalwritten.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",criminalwritten.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",criminalwritten.addNote);
router.get("/findcomponentsfor/:for",criminalwritten.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",criminalwritten.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",criminalwritten.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",criminalwritten.reinitiateCheck);
// router.get("/",criminalwritten.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", criminalwritten.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", criminalwritten.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", criminalwritten.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", criminalwritten.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        