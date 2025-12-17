
const testcopy = require('../controllers/data_entry/testcopy.controller');
const express = require('express');
const router = express.Router();

router.post("/",testcopy.create);
router.get("/:case",testcopy.findAllForACase);
router.get("/findone/:caseId/:componentId",testcopy.findOne);
router.post("/uploadfile",testcopy.uploadFile);
router.post("/uploadproofofwork",testcopy.uploadProofOfWork);
router.post("/uploadpvproofofwork",testcopy.uploadPvProofOfWork);
router.post("/uploadpaymentproof",testcopy.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",testcopy.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",testcopy.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",testcopy.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",testcopy.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",testcopy.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",testcopy.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",testcopy.readPaymentProofs);
router.put("/:caseId/:componentId",testcopy.update);
router.put("/updatedataentrystatus/:caseId/:componentId",testcopy.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",testcopy.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",testcopy.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",testcopy.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",testcopy.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",testcopy.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",testcopy.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",testcopy.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",testcopy.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",testcopy.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",testcopy.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",testcopy.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",testcopy.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",testcopy.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",testcopy.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",testcopy.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",testcopy.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",testcopy.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",testcopy.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",testcopy.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",testcopy.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",testcopy.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",testcopy.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",testcopy.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",testcopy.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",testcopy.addNote);
router.get("/findcomponentsfor/:for",testcopy.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",testcopy.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",testcopy.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",testcopy.reinitiateCheck);
router.post("/addquicknote",testcopy.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id",testcopy.getAllquicknoteForACheck)
module.exports = router;
        