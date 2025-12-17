
const csadp = require('../controllers/data_entry/csadp.controller');
const express = require('express');
const router = express.Router();


router.post("/",csadp.create);
router.get("/:case",csadp.findAllForACase);
router.get("/findone/:caseId/:componentId",csadp.findOne);
router.post("/uploadfile",csadp.uploadFile);
router.post("/uploadproofofwork",csadp.uploadProofOfWork);
router.post("/uploadpvproofofwork",csadp.uploadPvProofOfWork);
router.post("/uploadpaymentproof",csadp.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",csadp.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",csadp.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",csadp.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",csadp.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",csadp.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",csadp.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",csadp.readPaymentProofs);
router.put("/:caseId/:componentId",csadp.update);
router.put("/updatedataentrystatus/:caseId/:componentId",csadp.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",csadp.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",csadp.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",csadp.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",csadp.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",csadp.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",csadp.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",csadp.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",csadp.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",csadp.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",csadp.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",csadp.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",csadp.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",csadp.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",csadp.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",csadp.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",csadp.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",csadp.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",csadp.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",csadp.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",csadp.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",csadp.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",csadp.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",csadp.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",csadp.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",csadp.addNote);
router.get("/findcomponentsfor/:for",csadp.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",csadp.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",csadp.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",csadp.reinitiateCheck);
// router.get("/",csadp.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", csadp.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", csadp.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", csadp.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", csadp.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        