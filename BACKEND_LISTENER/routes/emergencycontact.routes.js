
const emergencycontact = require('../controllers/data_entry/emergencycontact.controller');
const express = require('express');
const router = express.Router();


router.post("/",emergencycontact.create);
router.get("/:case",emergencycontact.findAllForACase);
router.get("/findone/:caseId/:componentId",emergencycontact.findOne);
router.post("/uploadfile",emergencycontact.uploadFile);
router.post("/uploadproofofwork",emergencycontact.uploadProofOfWork);
router.post("/uploadpvproofofwork",emergencycontact.uploadPvProofOfWork);
router.post("/uploadpaymentproof",emergencycontact.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",emergencycontact.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",emergencycontact.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",emergencycontact.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",emergencycontact.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",emergencycontact.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",emergencycontact.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",emergencycontact.readPaymentProofs);
router.put("/:caseId/:componentId",emergencycontact.update);
router.put("/updatedataentrystatus/:caseId/:componentId",emergencycontact.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",emergencycontact.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",emergencycontact.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",emergencycontact.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",emergencycontact.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",emergencycontact.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",emergencycontact.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",emergencycontact.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",emergencycontact.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",emergencycontact.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",emergencycontact.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",emergencycontact.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",emergencycontact.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",emergencycontact.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",emergencycontact.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",emergencycontact.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",emergencycontact.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",emergencycontact.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",emergencycontact.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",emergencycontact.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",emergencycontact.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",emergencycontact.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",emergencycontact.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",emergencycontact.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",emergencycontact.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",emergencycontact.addNote);
router.get("/findcomponentsfor/:for",emergencycontact.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",emergencycontact.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",emergencycontact.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",emergencycontact.reinitiateCheck);
// router.get("/",emergencycontact.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", emergencycontact.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", emergencycontact.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", emergencycontact.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", emergencycontact.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        