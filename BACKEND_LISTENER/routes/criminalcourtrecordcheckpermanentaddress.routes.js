
const criminalcourtrecordcheckpermanentaddress = require('../controllers/data_entry/criminalcourtrecordcheckpermanentaddress.controller');
const express = require('express');
const router = express.Router();


router.post("/",criminalcourtrecordcheckpermanentaddress.create);
router.get("/:case",criminalcourtrecordcheckpermanentaddress.findAllForACase);
router.get("/findone/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.findOne);
router.post("/uploadfile",criminalcourtrecordcheckpermanentaddress.uploadFile);
router.post("/uploadproofofwork",criminalcourtrecordcheckpermanentaddress.uploadProofOfWork);
router.post("/uploadpvproofofwork",criminalcourtrecordcheckpermanentaddress.uploadPvProofOfWork);
router.post("/uploadpaymentproof",criminalcourtrecordcheckpermanentaddress.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",criminalcourtrecordcheckpermanentaddress.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",criminalcourtrecordcheckpermanentaddress.readPaymentProofs);
router.put("/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.update);
router.put("/updatedataentrystatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",criminalcourtrecordcheckpermanentaddress.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",criminalcourtrecordcheckpermanentaddress.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",criminalcourtrecordcheckpermanentaddress.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",criminalcourtrecordcheckpermanentaddress.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.addNote);
router.get("/findcomponentsfor/:for",criminalcourtrecordcheckpermanentaddress.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",criminalcourtrecordcheckpermanentaddress.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",criminalcourtrecordcheckpermanentaddress.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",criminalcourtrecordcheckpermanentaddress.reinitiateCheck);
// router.get("/",criminalcourtrecordcheckpermanentaddress.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", criminalcourtrecordcheckpermanentaddress.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", criminalcourtrecordcheckpermanentaddress.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", criminalcourtrecordcheckpermanentaddress.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", criminalcourtrecordcheckpermanentaddress.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        