
const permanentaddress = require('../controllers/data_entry/permanentaddress.controller');
const express = require('express');
const router = express.Router();


router.post("/",permanentaddress.create);
router.get("/:case",permanentaddress.findAllForACase);
router.get("/findone/:caseId/:componentId",permanentaddress.findOne);
router.post("/uploadfile",permanentaddress.uploadFile);
router.post("/uploadproofofwork",permanentaddress.uploadProofOfWork);
router.post("/uploadpvproofofwork",permanentaddress.uploadPvProofOfWork);
router.post("/uploadpaymentproof",permanentaddress.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",permanentaddress.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",permanentaddress.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",permanentaddress.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",permanentaddress.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",permanentaddress.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",permanentaddress.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",permanentaddress.readPaymentProofs);
router.put("/:caseId/:componentId",permanentaddress.update);
router.put("/updatedataentrystatus/:caseId/:componentId",permanentaddress.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",permanentaddress.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",permanentaddress.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",permanentaddress.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",permanentaddress.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",permanentaddress.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",permanentaddress.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",permanentaddress.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",permanentaddress.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",permanentaddress.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",permanentaddress.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",permanentaddress.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",permanentaddress.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",permanentaddress.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",permanentaddress.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",permanentaddress.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",permanentaddress.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",permanentaddress.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",permanentaddress.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",permanentaddress.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",permanentaddress.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",permanentaddress.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",permanentaddress.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",permanentaddress.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",permanentaddress.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",permanentaddress.addNote);
router.get("/findcomponentsfor/:for",permanentaddress.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",permanentaddress.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",permanentaddress.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",permanentaddress.reinitiateCheck);
// router.get("/",permanentaddress.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", permanentaddress.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", permanentaddress.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", permanentaddress.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", permanentaddress.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        