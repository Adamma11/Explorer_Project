
const fca = require('../controllers/data_entry/fca.controller');
const express = require('express');
const router = express.Router();


router.post("/",fca.create);
router.get("/:case",fca.findAllForACase);
router.get("/findone/:caseId/:componentId",fca.findOne);
router.post("/uploadfile",fca.uploadFile);
router.post("/uploadproofofwork",fca.uploadProofOfWork);
router.post("/uploadpvproofofwork",fca.uploadPvProofOfWork);
router.post("/uploadpaymentproof",fca.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",fca.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",fca.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",fca.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",fca.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",fca.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",fca.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",fca.readPaymentProofs);
router.put("/:caseId/:componentId",fca.update);
router.put("/updatedataentrystatus/:caseId/:componentId",fca.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",fca.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",fca.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",fca.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",fca.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",fca.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",fca.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",fca.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",fca.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",fca.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",fca.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",fca.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",fca.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",fca.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",fca.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",fca.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",fca.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",fca.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",fca.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",fca.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",fca.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",fca.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",fca.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",fca.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",fca.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",fca.addNote);
router.get("/findcomponentsfor/:for",fca.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",fca.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",fca.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",fca.reinitiateCheck);
// router.get("/",fca.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", fca.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", fca.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", fca.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", fca.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        