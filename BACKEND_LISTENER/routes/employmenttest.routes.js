
const employmenttest = require('../controllers/data_entry/employmenttest.controller');
const express = require('express');
const router = express.Router();


router.post("/",employmenttest.create);
router.get("/:case",employmenttest.findAllForACase);
router.get("/findone/:caseId/:componentId",employmenttest.findOne);
router.post("/uploadfile",employmenttest.uploadFile);
router.post("/uploadproofofwork",employmenttest.uploadProofOfWork);
router.post("/uploadpvproofofwork",employmenttest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",employmenttest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",employmenttest.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",employmenttest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",employmenttest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",employmenttest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",employmenttest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",employmenttest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",employmenttest.readPaymentProofs);
router.put("/:caseId/:componentId",employmenttest.update);
router.put("/updatedataentrystatus/:caseId/:componentId",employmenttest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",employmenttest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",employmenttest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",employmenttest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",employmenttest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",employmenttest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",employmenttest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",employmenttest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",employmenttest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",employmenttest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",employmenttest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",employmenttest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",employmenttest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",employmenttest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",employmenttest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",employmenttest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",employmenttest.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",employmenttest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",employmenttest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",employmenttest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",employmenttest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",employmenttest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",employmenttest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",employmenttest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",employmenttest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",employmenttest.addNote);
router.get("/findcomponentsfor/:for",employmenttest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",employmenttest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",employmenttest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",employmenttest.reinitiateCheck);
// router.get("/",employmenttest.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", employmenttest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", employmenttest.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", employmenttest.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", employmenttest.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        