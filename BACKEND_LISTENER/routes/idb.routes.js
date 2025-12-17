
const idb = require('../controllers/data_entry/idb.controller');
const express = require('express');
const router = express.Router();


router.post("/",idb.create);
router.get("/:case",idb.findAllForACase);
router.get("/findone/:caseId/:componentId",idb.findOne);
router.post("/uploadfile",idb.uploadFile);
router.post("/uploadproofofwork",idb.uploadProofOfWork);
router.post("/uploadpvproofofwork",idb.uploadPvProofOfWork);
router.post("/uploadpaymentproof",idb.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",idb.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",idb.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",idb.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",idb.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",idb.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",idb.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",idb.readPaymentProofs);
router.put("/:caseId/:componentId",idb.update);
router.put("/updatedataentrystatus/:caseId/:componentId",idb.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",idb.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",idb.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",idb.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",idb.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",idb.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",idb.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",idb.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",idb.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",idb.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",idb.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",idb.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",idb.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",idb.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",idb.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",idb.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",idb.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",idb.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",idb.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",idb.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",idb.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",idb.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",idb.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",idb.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",idb.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",idb.addNote);
router.get("/findcomponentsfor/:for",idb.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",idb.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",idb.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",idb.reinitiateCheck);
// router.get("/",idb.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", idb.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", idb.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", idb.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", idb.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        