
const globex = require('../controllers/data_entry/globex.controller');
const express = require('express');
const router = express.Router();


router.post("/",globex.create);
router.get("/:case",globex.findAllForACase);
router.get("/findone/:caseId/:componentId",globex.findOne);
router.post("/uploadfile",globex.uploadFile);
router.post("/uploadproofofwork",globex.uploadProofOfWork);
router.post("/uploadpvproofofwork",globex.uploadPvProofOfWork);
router.post("/uploadpaymentproof",globex.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",globex.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",globex.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",globex.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",globex.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",globex.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",globex.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",globex.readPaymentProofs);
router.put("/:caseId/:componentId",globex.update);
router.put("/updatedataentrystatus/:caseId/:componentId",globex.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",globex.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",globex.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",globex.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",globex.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",globex.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",globex.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",globex.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",globex.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",globex.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",globex.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",globex.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",globex.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",globex.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",globex.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",globex.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",globex.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",globex.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",globex.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",globex.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",globex.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",globex.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",globex.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",globex.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",globex.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",globex.addNote);
router.get("/findcomponentsfor/:for",globex.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",globex.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",globex.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",globex.reinitiateCheck);
// router.get("/",globex.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", globex.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", globex.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", globex.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", globex.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        