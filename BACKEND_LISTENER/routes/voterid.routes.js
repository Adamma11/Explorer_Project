
const voterid = require('../controllers/data_entry/voterid.controller');
const express = require('express');
const router = express.Router();


router.post("/",voterid.create);
router.get("/:case",voterid.findAllForACase);
router.get("/findone/:caseId/:componentId",voterid.findOne);
router.post("/uploadfile",voterid.uploadFile);
router.post("/uploadproofofwork",voterid.uploadProofOfWork);
router.post("/uploadpvproofofwork",voterid.uploadPvProofOfWork);
router.post("/uploadpaymentproof",voterid.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",voterid.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",voterid.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",voterid.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",voterid.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",voterid.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",voterid.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",voterid.readPaymentProofs);
router.put("/:caseId/:componentId",voterid.update);
router.put("/updatedataentrystatus/:caseId/:componentId",voterid.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",voterid.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",voterid.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",voterid.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",voterid.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",voterid.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",voterid.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",voterid.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",voterid.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",voterid.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",voterid.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",voterid.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",voterid.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",voterid.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",voterid.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",voterid.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",voterid.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",voterid.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",voterid.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",voterid.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",voterid.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",voterid.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",voterid.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",voterid.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",voterid.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",voterid.addNote);
router.get("/findcomponentsfor/:for",voterid.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",voterid.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",voterid.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",voterid.reinitiateCheck);
// router.get("/",voterid.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", voterid.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", voterid.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", voterid.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", voterid.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        