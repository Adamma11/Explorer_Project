
const additionalidb = require('../controllers/data_entry/additionalidb.controller');
const express = require('express');
const router = express.Router();


router.post("/",additionalidb.create);
router.get("/:case",additionalidb.findAllForACase);
router.get("/findone/:caseId/:componentId",additionalidb.findOne);
router.post("/uploadfile",additionalidb.uploadFile);
router.post("/uploadproofofwork",additionalidb.uploadProofOfWork);
router.post("/uploadpvproofofwork",additionalidb.uploadPvProofOfWork);
router.post("/uploadpaymentproof",additionalidb.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",additionalidb.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",additionalidb.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",additionalidb.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",additionalidb.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",additionalidb.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",additionalidb.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",additionalidb.readPaymentProofs);
router.put("/:caseId/:componentId",additionalidb.update);
router.put("/updatedataentrystatus/:caseId/:componentId",additionalidb.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",additionalidb.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",additionalidb.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",additionalidb.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",additionalidb.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",additionalidb.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",additionalidb.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",additionalidb.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",additionalidb.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",additionalidb.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",additionalidb.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",additionalidb.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",additionalidb.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",additionalidb.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",additionalidb.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",additionalidb.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",additionalidb.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",additionalidb.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",additionalidb.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",additionalidb.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",additionalidb.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",additionalidb.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",additionalidb.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",additionalidb.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",additionalidb.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",additionalidb.addNote);
router.get("/findcomponentsfor/:for",additionalidb.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",additionalidb.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",additionalidb.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",additionalidb.reinitiateCheck);
// router.get("/",additionalidb.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", additionalidb.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", additionalidb.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", additionalidb.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", additionalidb.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        