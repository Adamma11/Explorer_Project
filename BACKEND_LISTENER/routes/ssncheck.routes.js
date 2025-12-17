
const ssncheck = require('../controllers/data_entry/ssncheck.controller');
const express = require('express');
const router = express.Router();


router.post("/",ssncheck.create);
router.get("/:case",ssncheck.findAllForACase);
router.get("/findone/:caseId/:componentId",ssncheck.findOne);
router.post("/uploadfile",ssncheck.uploadFile);
router.post("/uploadproofofwork",ssncheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",ssncheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",ssncheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",ssncheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",ssncheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",ssncheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",ssncheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",ssncheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",ssncheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",ssncheck.readPaymentProofs);
router.put("/:caseId/:componentId",ssncheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",ssncheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",ssncheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",ssncheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",ssncheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",ssncheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",ssncheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",ssncheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",ssncheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",ssncheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",ssncheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",ssncheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",ssncheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",ssncheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",ssncheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",ssncheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",ssncheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",ssncheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",ssncheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",ssncheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",ssncheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",ssncheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",ssncheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",ssncheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",ssncheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",ssncheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",ssncheck.addNote);
router.get("/findcomponentsfor/:for",ssncheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",ssncheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",ssncheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",ssncheck.reinitiateCheck);
// router.get("/",ssncheck.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", ssncheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", ssncheck.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", ssncheck.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", ssncheck.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        