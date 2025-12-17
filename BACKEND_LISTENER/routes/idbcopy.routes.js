
const idbcopy = require('../controllers/data_entry/idbcopy.controller');
const express = require('express');
const router = express.Router();

router.post("/",idbcopy.create);
router.get("/:case",idbcopy.findAllForACase);
router.get("/findone/:caseId/:componentId",idbcopy.findOne);
router.post("/uploadfile",idbcopy.uploadFile);
router.post("/uploadproofofwork",idbcopy.uploadProofOfWork);
router.post("/uploadpvproofofwork",idbcopy.uploadPvProofOfWork);
router.post("/uploadpaymentproof",idbcopy.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",idbcopy.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",idbcopy.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",idbcopy.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",idbcopy.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",idbcopy.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",idbcopy.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",idbcopy.readPaymentProofs);
router.put("/:caseId/:componentId",idbcopy.update);
router.put("/updatedataentrystatus/:caseId/:componentId",idbcopy.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",idbcopy.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",idbcopy.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",idbcopy.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",idbcopy.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",idbcopy.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",idbcopy.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",idbcopy.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",idbcopy.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",idbcopy.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",idbcopy.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",idbcopy.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",idbcopy.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",idbcopy.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",idbcopy.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",idbcopy.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",idbcopy.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",idbcopy.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",idbcopy.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",idbcopy.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",idbcopy.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",idbcopy.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",idbcopy.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",idbcopy.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",idbcopy.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",idbcopy.addNote);
router.get("/findcomponentsfor/:for",idbcopy.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",idbcopy.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",idbcopy.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",idbcopy.reinitiateCheck);
router.post("/addquicknote",idbcopy.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id",idbcopy.getAllquicknoteForACheck)
module.exports = router;
        