
const pan = require('../controllers/data_entry/pan.controller');
const express = require('express');
const router = express.Router();


router.post("/",pan.create);
router.get("/:case",pan.findAllForACase);
router.get("/findone/:caseId/:componentId",pan.findOne);
router.post("/uploadfile",pan.uploadFile);
router.post("/uploadproofofwork",pan.uploadProofOfWork);
router.post("/uploadpvproofofwork",pan.uploadPvProofOfWork);
router.post("/uploadpaymentproof",pan.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",pan.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",pan.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",pan.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",pan.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",pan.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",pan.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",pan.readPaymentProofs);
router.put("/:caseId/:componentId",pan.update);
router.put("/updatedataentrystatus/:caseId/:componentId",pan.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",pan.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",pan.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",pan.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",pan.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",pan.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",pan.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",pan.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",pan.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",pan.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",pan.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",pan.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",pan.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",pan.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",pan.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",pan.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",pan.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",pan.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",pan.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",pan.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",pan.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",pan.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",pan.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",pan.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",pan.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",pan.addNote);
router.get("/findcomponentsfor/:for",pan.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",pan.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",pan.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",pan.reinitiateCheck);
// router.get("/",pan.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", pan.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", pan.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", pan.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", pan.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        