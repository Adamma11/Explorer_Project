
const cvc = require('../controllers/data_entry/cvc.controller');
const express = require('express');
const router = express.Router();


router.post("/",cvc.create);
router.get("/:case",cvc.findAllForACase);
router.get("/findone/:caseId/:componentId",cvc.findOne);
router.post("/uploadfile",cvc.uploadFile);
router.post("/uploadproofofwork",cvc.uploadProofOfWork);
router.post("/uploadpvproofofwork",cvc.uploadPvProofOfWork);
router.post("/uploadpaymentproof",cvc.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",cvc.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",cvc.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",cvc.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",cvc.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",cvc.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",cvc.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",cvc.readPaymentProofs);
router.put("/:caseId/:componentId",cvc.update);
router.put("/updatedataentrystatus/:caseId/:componentId",cvc.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",cvc.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",cvc.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",cvc.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",cvc.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",cvc.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",cvc.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",cvc.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",cvc.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",cvc.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",cvc.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",cvc.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",cvc.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",cvc.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",cvc.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",cvc.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",cvc.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",cvc.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",cvc.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",cvc.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",cvc.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",cvc.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",cvc.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",cvc.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",cvc.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",cvc.addNote);
router.get("/findcomponentsfor/:for",cvc.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",cvc.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",cvc.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",cvc.reinitiateCheck);
// router.get("/",cvc.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", cvc.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", cvc.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", cvc.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", cvc.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        