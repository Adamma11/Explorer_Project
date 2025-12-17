
const drivinglicense = require('../controllers/data_entry/drivinglicense.controller');
const express = require('express');
const router = express.Router();


router.post("/",drivinglicense.create);
router.get("/:case",drivinglicense.findAllForACase);
router.get("/findone/:caseId/:componentId",drivinglicense.findOne);
router.post("/uploadfile",drivinglicense.uploadFile);
router.post("/uploadproofofwork",drivinglicense.uploadProofOfWork);
router.post("/uploadpvproofofwork",drivinglicense.uploadPvProofOfWork);
router.post("/uploadpaymentproof",drivinglicense.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",drivinglicense.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",drivinglicense.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",drivinglicense.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",drivinglicense.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",drivinglicense.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",drivinglicense.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",drivinglicense.readPaymentProofs);
router.put("/:caseId/:componentId",drivinglicense.update);
router.put("/updatedataentrystatus/:caseId/:componentId",drivinglicense.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",drivinglicense.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",drivinglicense.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",drivinglicense.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",drivinglicense.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",drivinglicense.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",drivinglicense.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",drivinglicense.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",drivinglicense.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",drivinglicense.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",drivinglicense.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",drivinglicense.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",drivinglicense.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",drivinglicense.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",drivinglicense.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",drivinglicense.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",drivinglicense.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",drivinglicense.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",drivinglicense.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",drivinglicense.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",drivinglicense.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",drivinglicense.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",drivinglicense.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",drivinglicense.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",drivinglicense.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",drivinglicense.addNote);
router.get("/findcomponentsfor/:for",drivinglicense.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",drivinglicense.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",drivinglicense.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",drivinglicense.reinitiateCheck);
// router.get("/",drivinglicense.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", drivinglicense.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", drivinglicense.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", drivinglicense.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", drivinglicense.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        