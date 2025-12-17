
const gapanalysis = require('../controllers/data_entry/gapanalysis.controller');
const express = require('express');
const router = express.Router();


router.post("/",gapanalysis.create);
router.get("/:case",gapanalysis.findAllForACase);
router.get("/findone/:caseId/:componentId",gapanalysis.findOne);
router.post("/uploadfile",gapanalysis.uploadFile);
router.post("/uploadproofofwork",gapanalysis.uploadProofOfWork);
router.post("/uploadpvproofofwork",gapanalysis.uploadPvProofOfWork);
router.post("/uploadpaymentproof",gapanalysis.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",gapanalysis.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",gapanalysis.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",gapanalysis.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",gapanalysis.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",gapanalysis.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",gapanalysis.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",gapanalysis.readPaymentProofs);
router.put("/:caseId/:componentId",gapanalysis.update);
router.put("/updatedataentrystatus/:caseId/:componentId",gapanalysis.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",gapanalysis.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",gapanalysis.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",gapanalysis.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",gapanalysis.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",gapanalysis.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",gapanalysis.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",gapanalysis.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",gapanalysis.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",gapanalysis.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",gapanalysis.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",gapanalysis.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",gapanalysis.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",gapanalysis.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",gapanalysis.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",gapanalysis.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",gapanalysis.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",gapanalysis.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",gapanalysis.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",gapanalysis.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",gapanalysis.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",gapanalysis.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",gapanalysis.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",gapanalysis.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",gapanalysis.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",gapanalysis.addNote);
router.get("/findcomponentsfor/:for",gapanalysis.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",gapanalysis.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",gapanalysis.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",gapanalysis.reinitiateCheck);
// router.get("/",gapanalysis.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", gapanalysis.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", gapanalysis.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", gapanalysis.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", gapanalysis.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        