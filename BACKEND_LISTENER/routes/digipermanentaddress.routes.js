
const digipermanentaddress = require('../controllers/data_entry/digipermanentaddress.controller');
const express = require('express');
const router = express.Router();


router.post("/",digipermanentaddress.create);
router.get("/:case",digipermanentaddress.findAllForACase);
router.get("/findone/:caseId/:componentId",digipermanentaddress.findOne);
router.post("/uploadfile",digipermanentaddress.uploadFile);
router.post("/uploadproofofwork",digipermanentaddress.uploadProofOfWork);
router.post("/uploadpvproofofwork",digipermanentaddress.uploadPvProofOfWork);
router.post("/uploadpaymentproof",digipermanentaddress.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",digipermanentaddress.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",digipermanentaddress.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",digipermanentaddress.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",digipermanentaddress.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",digipermanentaddress.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",digipermanentaddress.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",digipermanentaddress.readPaymentProofs);
router.put("/:caseId/:componentId",digipermanentaddress.update);
router.put("/updatedataentrystatus/:caseId/:componentId",digipermanentaddress.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",digipermanentaddress.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",digipermanentaddress.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",digipermanentaddress.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",digipermanentaddress.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",digipermanentaddress.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",digipermanentaddress.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",digipermanentaddress.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",digipermanentaddress.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",digipermanentaddress.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",digipermanentaddress.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",digipermanentaddress.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",digipermanentaddress.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",digipermanentaddress.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",digipermanentaddress.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",digipermanentaddress.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",digipermanentaddress.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",digipermanentaddress.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",digipermanentaddress.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",digipermanentaddress.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",digipermanentaddress.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",digipermanentaddress.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",digipermanentaddress.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",digipermanentaddress.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",digipermanentaddress.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",digipermanentaddress.addNote);
router.get("/findcomponentsfor/:for",digipermanentaddress.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",digipermanentaddress.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",digipermanentaddress.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",digipermanentaddress.reinitiateCheck);
// router.get("/",digipermanentaddress.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", digipermanentaddress.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", digipermanentaddress.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", digipermanentaddress.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", digipermanentaddress.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        