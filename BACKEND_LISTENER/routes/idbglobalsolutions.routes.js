const idbglobalsolutions = require('../controllers/data_entry/idbglobalsolutions.controller');
const express = require('express');
const router = express.Router();

router.post("/",idbglobalsolutions.create);
router.get("/:case",idbglobalsolutions.findAllForACase);
router.get("/findone/:caseId/:componentId",idbglobalsolutions.findOne);
router.post("/uploadfile",idbglobalsolutions.uploadFile);
router.post("/uploadproofofwork",idbglobalsolutions.uploadProofOfWork);
router.post("/uploadpvproofofwork",idbglobalsolutions.uploadPvProofOfWork);
router.post("/uploadpaymentproof",idbglobalsolutions.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",idbglobalsolutions.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",idbglobalsolutions.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",idbglobalsolutions.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",idbglobalsolutions.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",idbglobalsolutions.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",idbglobalsolutions.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",idbglobalsolutions.readPaymentProofs);
router.put("/:caseId/:componentId",idbglobalsolutions.update);
router.put("/updatedataentrystatus/:caseId/:componentId",idbglobalsolutions.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",idbglobalsolutions.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",idbglobalsolutions.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",idbglobalsolutions.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",idbglobalsolutions.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",idbglobalsolutions.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",idbglobalsolutions.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",idbglobalsolutions.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",idbglobalsolutions.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",idbglobalsolutions.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",idbglobalsolutions.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",idbglobalsolutions.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",idbglobalsolutions.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",idbglobalsolutions.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",idbglobalsolutions.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",idbglobalsolutions.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",idbglobalsolutions.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",idbglobalsolutions.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",idbglobalsolutions.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",idbglobalsolutions.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",idbglobalsolutions.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",idbglobalsolutions.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",idbglobalsolutions.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",idbglobalsolutions.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",idbglobalsolutions.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",idbglobalsolutions.addNote);
router.get("/findcomponentsfor/:for",idbglobalsolutions.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",idbglobalsolutions.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",idbglobalsolutions.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",idbglobalsolutions.reinitiateCheck);
router.post("/addquicknote", idbglobalsolutions.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", idbglobalsolutions.getAllquicknoteForACheck)
module.exports = router;
