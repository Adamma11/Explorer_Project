
const employmenttest3 = require('../controllers/data_entry/employmenttest3.controller');
const express = require('express');
const router = express.Router();


router.post("/",employmenttest3.create);
router.get("/:case",employmenttest3.findAllForACase);
router.get("/findone/:caseId/:componentId",employmenttest3.findOne);
router.post("/uploadfile",employmenttest3.uploadFile);
router.post("/uploadproofofwork",employmenttest3.uploadProofOfWork);
router.post("/uploadpvproofofwork",employmenttest3.uploadPvProofOfWork);
router.post("/uploadpaymentproof",employmenttest3.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",employmenttest3.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",employmenttest3.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",employmenttest3.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",employmenttest3.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",employmenttest3.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",employmenttest3.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",employmenttest3.readPaymentProofs);
router.put("/:caseId/:componentId",employmenttest3.update);
router.put("/updatedataentrystatus/:caseId/:componentId",employmenttest3.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",employmenttest3.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",employmenttest3.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",employmenttest3.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",employmenttest3.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",employmenttest3.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",employmenttest3.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",employmenttest3.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",employmenttest3.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",employmenttest3.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",employmenttest3.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",employmenttest3.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",employmenttest3.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",employmenttest3.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",employmenttest3.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",employmenttest3.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",employmenttest3.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",employmenttest3.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",employmenttest3.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",employmenttest3.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",employmenttest3.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",employmenttest3.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",employmenttest3.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",employmenttest3.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",employmenttest3.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",employmenttest3.addNote);
router.get("/findcomponentsfor/:for",employmenttest3.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",employmenttest3.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",employmenttest3.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",employmenttest3.reinitiateCheck);
// router.get("/",employmenttest3.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", employmenttest3.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", employmenttest3.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", employmenttest3.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", employmenttest3.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        