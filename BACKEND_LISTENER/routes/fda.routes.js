
const fda = require('../controllers/data_entry/fda.controller');
const express = require('express');
const router = express.Router();


router.post("/",fda.create);
router.get("/:case",fda.findAllForACase);
router.get("/findone/:caseId/:componentId",fda.findOne);
router.post("/uploadfile",fda.uploadFile);
router.post("/uploadproofofwork",fda.uploadProofOfWork);
router.post("/uploadpvproofofwork",fda.uploadPvProofOfWork);
router.post("/uploadpaymentproof",fda.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",fda.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",fda.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",fda.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",fda.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",fda.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",fda.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",fda.readPaymentProofs);
router.put("/:caseId/:componentId",fda.update);
router.put("/updatedataentrystatus/:caseId/:componentId",fda.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",fda.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",fda.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",fda.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",fda.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",fda.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",fda.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",fda.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",fda.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",fda.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",fda.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",fda.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",fda.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",fda.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",fda.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",fda.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",fda.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",fda.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",fda.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",fda.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",fda.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",fda.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",fda.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",fda.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",fda.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",fda.addNote);
router.get("/findcomponentsfor/:for",fda.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",fda.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",fda.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",fda.reinitiateCheck);
// router.get("/",fda.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", fda.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", fda.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", fda.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", fda.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        