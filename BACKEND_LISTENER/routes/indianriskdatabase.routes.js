
const indianriskdatabase = require('../controllers/data_entry/indianriskdatabase.controller');
const express = require('express');
const router = express.Router();


router.post("/",indianriskdatabase.create);
router.get("/:case",indianriskdatabase.findAllForACase);
router.get("/findone/:caseId/:componentId",indianriskdatabase.findOne);
router.post("/uploadfile",indianriskdatabase.uploadFile);
router.post("/uploadproofofwork",indianriskdatabase.uploadProofOfWork);
router.post("/uploadpvproofofwork",indianriskdatabase.uploadPvProofOfWork);
router.post("/uploadpaymentproof",indianriskdatabase.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",indianriskdatabase.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",indianriskdatabase.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",indianriskdatabase.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",indianriskdatabase.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",indianriskdatabase.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",indianriskdatabase.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",indianriskdatabase.readPaymentProofs);
router.put("/:caseId/:componentId",indianriskdatabase.update);
router.put("/updatedataentrystatus/:caseId/:componentId",indianriskdatabase.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",indianriskdatabase.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",indianriskdatabase.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",indianriskdatabase.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",indianriskdatabase.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",indianriskdatabase.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",indianriskdatabase.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",indianriskdatabase.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",indianriskdatabase.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",indianriskdatabase.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",indianriskdatabase.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",indianriskdatabase.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",indianriskdatabase.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",indianriskdatabase.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",indianriskdatabase.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",indianriskdatabase.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",indianriskdatabase.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",indianriskdatabase.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",indianriskdatabase.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",indianriskdatabase.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",indianriskdatabase.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",indianriskdatabase.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",indianriskdatabase.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",indianriskdatabase.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",indianriskdatabase.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",indianriskdatabase.addNote);
router.get("/findcomponentsfor/:for",indianriskdatabase.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",indianriskdatabase.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",indianriskdatabase.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",indianriskdatabase.reinitiateCheck);
// router.get("/",indianriskdatabase.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", indianriskdatabase.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", indianriskdatabase.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", indianriskdatabase.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", indianriskdatabase.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        