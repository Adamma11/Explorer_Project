
const identity = require('../controllers/data_entry/identity.controller');
const express = require('express');
const router = express.Router();


router.post("/",identity.create);
router.get("/getDropboxChecks",identity.getChecksForDropbox);

router.get("/:case",identity.findAllForACase);
router.get("/findone/:caseId/:componentId",identity.findOne);
router.post("/uploadfile",identity.uploadFile);
router.post("/uploadproofofwork",identity.uploadProofOfWork);
router.post("/uploadpvproofofwork",identity.uploadPvProofOfWork);
router.post("/uploadpaymentproof",identity.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",identity.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",identity.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",identity.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",identity.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",identity.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",identity.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",identity.readPaymentProofs);
router.put("/:caseId/:componentId",identity.update);
router.put("/updatedataentrystatus/:caseId/:componentId",identity.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",identity.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",identity.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",identity.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",identity.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",identity.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",identity.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",identity.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",identity.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",identity.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",identity.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",identity.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",identity.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",identity.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",identity.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",identity.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",identity.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",identity.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",identity.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",identity.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",identity.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",identity.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",identity.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",identity.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",identity.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",identity.addNote);
router.get("/findcomponentsfor/:for",identity.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",identity.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",identity.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",identity.reinitiateCheck);
// router.get("/",identity.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", identity.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", identity.getAllquicknoteForACheck)
router.post("/generatePdfWithSurepass",identity.generatePdfWithSurepass);
//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", identity.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", identity.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        
