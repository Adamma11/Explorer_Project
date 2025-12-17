
const digitcurrentandpermanentaddress = require('../controllers/data_entry/digitcurrentandpermanentaddress.controller');
const express = require('express');
const router = express.Router();


router.post("/",digitcurrentandpermanentaddress.create);
router.get("/:case",digitcurrentandpermanentaddress.findAllForACase);
router.get("/findone/:caseId/:componentId",digitcurrentandpermanentaddress.findOne);
router.post("/uploadfile",digitcurrentandpermanentaddress.uploadFile);
router.post("/uploadproofofwork",digitcurrentandpermanentaddress.uploadProofOfWork);
router.post("/uploadpvproofofwork",digitcurrentandpermanentaddress.uploadPvProofOfWork);
router.post("/uploadpaymentproof",digitcurrentandpermanentaddress.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",digitcurrentandpermanentaddress.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",digitcurrentandpermanentaddress.readPaymentProofs);
router.put("/:caseId/:componentId",digitcurrentandpermanentaddress.update);
router.put("/updatedataentrystatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",digitcurrentandpermanentaddress.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",digitcurrentandpermanentaddress.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",digitcurrentandpermanentaddress.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",digitcurrentandpermanentaddress.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",digitcurrentandpermanentaddress.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",digitcurrentandpermanentaddress.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",digitcurrentandpermanentaddress.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",digitcurrentandpermanentaddress.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",digitcurrentandpermanentaddress.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",digitcurrentandpermanentaddress.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",digitcurrentandpermanentaddress.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",digitcurrentandpermanentaddress.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",digitcurrentandpermanentaddress.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",digitcurrentandpermanentaddress.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",digitcurrentandpermanentaddress.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",digitcurrentandpermanentaddress.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",digitcurrentandpermanentaddress.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",digitcurrentandpermanentaddress.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",digitcurrentandpermanentaddress.addNote);
router.get("/findcomponentsfor/:for",digitcurrentandpermanentaddress.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",digitcurrentandpermanentaddress.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",digitcurrentandpermanentaddress.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",digitcurrentandpermanentaddress.reinitiateCheck);
// router.get("/",digitcurrentandpermanentaddress.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", digitcurrentandpermanentaddress.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", digitcurrentandpermanentaddress.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", digitcurrentandpermanentaddress.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", digitcurrentandpermanentaddress.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        