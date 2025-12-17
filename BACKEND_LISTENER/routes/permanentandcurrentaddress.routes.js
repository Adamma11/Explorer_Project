
const permanentandcurrentaddress = require('../controllers/data_entry/permanentandcurrentaddress.controller');
const express = require('express');
const router = express.Router();


router.post("/",permanentandcurrentaddress.create);
router.get("/:case",permanentandcurrentaddress.findAllForACase);
router.get("/findone/:caseId/:componentId",permanentandcurrentaddress.findOne);
router.post("/uploadfile",permanentandcurrentaddress.uploadFile);
router.post("/uploadproofofwork",permanentandcurrentaddress.uploadProofOfWork);
router.post("/uploadpvproofofwork",permanentandcurrentaddress.uploadPvProofOfWork);
router.post("/uploadpaymentproof",permanentandcurrentaddress.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",permanentandcurrentaddress.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",permanentandcurrentaddress.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",permanentandcurrentaddress.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",permanentandcurrentaddress.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",permanentandcurrentaddress.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",permanentandcurrentaddress.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",permanentandcurrentaddress.readPaymentProofs);
router.put("/:caseId/:componentId",permanentandcurrentaddress.update);
router.put("/updatedataentrystatus/:caseId/:componentId",permanentandcurrentaddress.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",permanentandcurrentaddress.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",permanentandcurrentaddress.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",permanentandcurrentaddress.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",permanentandcurrentaddress.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",permanentandcurrentaddress.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",permanentandcurrentaddress.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",permanentandcurrentaddress.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",permanentandcurrentaddress.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",permanentandcurrentaddress.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",permanentandcurrentaddress.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",permanentandcurrentaddress.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",permanentandcurrentaddress.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",permanentandcurrentaddress.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",permanentandcurrentaddress.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",permanentandcurrentaddress.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",permanentandcurrentaddress.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",permanentandcurrentaddress.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",permanentandcurrentaddress.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",permanentandcurrentaddress.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",permanentandcurrentaddress.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",permanentandcurrentaddress.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",permanentandcurrentaddress.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",permanentandcurrentaddress.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",permanentandcurrentaddress.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",permanentandcurrentaddress.addNote);
router.get("/findcomponentsfor/:for",permanentandcurrentaddress.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",permanentandcurrentaddress.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",permanentandcurrentaddress.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",permanentandcurrentaddress.reinitiateCheck);
// router.get("/",permanentandcurrentaddress.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", permanentandcurrentaddress.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", permanentandcurrentaddress.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", permanentandcurrentaddress.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", permanentandcurrentaddress.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        