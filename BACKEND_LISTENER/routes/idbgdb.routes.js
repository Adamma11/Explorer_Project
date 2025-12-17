
const idbgdb = require('../controllers/data_entry/idbgdb.controller');
const express = require('express');
const router = express.Router();


router.post("/",idbgdb.create);
router.get("/:case",idbgdb.findAllForACase);
router.get("/findone/:caseId/:componentId",idbgdb.findOne);
router.post("/uploadfile",idbgdb.uploadFile);
router.post("/uploadproofofwork",idbgdb.uploadProofOfWork);
router.post("/uploadpvproofofwork",idbgdb.uploadPvProofOfWork);
router.post("/uploadpaymentproof",idbgdb.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",idbgdb.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",idbgdb.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",idbgdb.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",idbgdb.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",idbgdb.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",idbgdb.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",idbgdb.readPaymentProofs);
router.put("/:caseId/:componentId",idbgdb.update);
router.put("/updatedataentrystatus/:caseId/:componentId",idbgdb.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",idbgdb.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",idbgdb.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",idbgdb.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",idbgdb.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",idbgdb.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",idbgdb.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",idbgdb.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",idbgdb.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",idbgdb.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",idbgdb.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",idbgdb.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",idbgdb.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",idbgdb.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",idbgdb.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",idbgdb.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",idbgdb.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",idbgdb.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",idbgdb.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",idbgdb.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",idbgdb.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",idbgdb.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",idbgdb.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",idbgdb.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",idbgdb.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",idbgdb.addNote);
router.get("/findcomponentsfor/:for",idbgdb.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",idbgdb.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",idbgdb.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",idbgdb.reinitiateCheck);
// router.get("/",idbgdb.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", idbgdb.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", idbgdb.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", idbgdb.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", idbgdb.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        