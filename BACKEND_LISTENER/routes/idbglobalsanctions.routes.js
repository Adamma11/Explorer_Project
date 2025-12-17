
const idbglobalsanctions = require('../controllers/data_entry/idbglobalsanctions.controller');
const express = require('express');
const router = express.Router();


router.post("/",idbglobalsanctions.create);
router.get("/:case",idbglobalsanctions.findAllForACase);
router.get("/findone/:caseId/:componentId",idbglobalsanctions.findOne);
router.post("/uploadfile",idbglobalsanctions.uploadFile);
router.post("/uploadproofofwork",idbglobalsanctions.uploadProofOfWork);
router.post("/uploadpvproofofwork",idbglobalsanctions.uploadPvProofOfWork);
router.post("/uploadpaymentproof",idbglobalsanctions.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",idbglobalsanctions.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",idbglobalsanctions.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",idbglobalsanctions.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",idbglobalsanctions.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",idbglobalsanctions.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",idbglobalsanctions.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",idbglobalsanctions.readPaymentProofs);
router.put("/:caseId/:componentId",idbglobalsanctions.update);
router.put("/updatedataentrystatus/:caseId/:componentId",idbglobalsanctions.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",idbglobalsanctions.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",idbglobalsanctions.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",idbglobalsanctions.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",idbglobalsanctions.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",idbglobalsanctions.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",idbglobalsanctions.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",idbglobalsanctions.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",idbglobalsanctions.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",idbglobalsanctions.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",idbglobalsanctions.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",idbglobalsanctions.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",idbglobalsanctions.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",idbglobalsanctions.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",idbglobalsanctions.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",idbglobalsanctions.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",idbglobalsanctions.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",idbglobalsanctions.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",idbglobalsanctions.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",idbglobalsanctions.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",idbglobalsanctions.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",idbglobalsanctions.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",idbglobalsanctions.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",idbglobalsanctions.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",idbglobalsanctions.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",idbglobalsanctions.addNote);
router.get("/findcomponentsfor/:for",idbglobalsanctions.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",idbglobalsanctions.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",idbglobalsanctions.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",idbglobalsanctions.reinitiateCheck);
// router.get("/",idbglobalsanctions.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", idbglobalsanctions.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", idbglobalsanctions.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", idbglobalsanctions.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", idbglobalsanctions.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        