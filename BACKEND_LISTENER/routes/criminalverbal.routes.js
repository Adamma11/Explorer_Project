
const criminalverbal = require('../controllers/data_entry/criminalverbal.controller');
const express = require('express');
const router = express.Router();


router.post("/",criminalverbal.create);
router.get("/:case",criminalverbal.findAllForACase);
router.get("/findone/:caseId/:componentId",criminalverbal.findOne);
router.post("/uploadfile",criminalverbal.uploadFile);
router.post("/uploadproofofwork",criminalverbal.uploadProofOfWork);
router.post("/uploadpvproofofwork",criminalverbal.uploadPvProofOfWork);
router.post("/uploadpaymentproof",criminalverbal.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",criminalverbal.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalverbal.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",criminalverbal.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",criminalverbal.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalverbal.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",criminalverbal.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",criminalverbal.readPaymentProofs);
router.put("/:caseId/:componentId",criminalverbal.update);
router.put("/updatedataentrystatus/:caseId/:componentId",criminalverbal.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",criminalverbal.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",criminalverbal.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",criminalverbal.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",criminalverbal.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",criminalverbal.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",criminalverbal.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",criminalverbal.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",criminalverbal.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",criminalverbal.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",criminalverbal.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",criminalverbal.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",criminalverbal.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",criminalverbal.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",criminalverbal.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",criminalverbal.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",criminalverbal.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",criminalverbal.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",criminalverbal.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",criminalverbal.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",criminalverbal.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",criminalverbal.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",criminalverbal.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",criminalverbal.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",criminalverbal.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",criminalverbal.addNote);
router.get("/findcomponentsfor/:for",criminalverbal.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",criminalverbal.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",criminalverbal.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",criminalverbal.reinitiateCheck);
// router.get("/",criminalverbal.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", criminalverbal.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", criminalverbal.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", criminalverbal.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", criminalverbal.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        