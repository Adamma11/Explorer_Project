const indianreputationalriskdatabase = require('../controllers/data_entry/indianreputationalriskdatabase.controller');
const express = require('express');
const router = express.Router();

router.post("/",indianreputationalriskdatabase.create);
router.get("/:case",indianreputationalriskdatabase.findAllForACase);
router.get("/findone/:caseId/:componentId",indianreputationalriskdatabase.findOne);
router.post("/uploadfile",indianreputationalriskdatabase.uploadFile);
router.post("/uploadproofofwork",indianreputationalriskdatabase.uploadProofOfWork);
router.post("/uploadpvproofofwork",indianreputationalriskdatabase.uploadPvProofOfWork);
router.post("/uploadpaymentproof",indianreputationalriskdatabase.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",indianreputationalriskdatabase.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",indianreputationalriskdatabase.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",indianreputationalriskdatabase.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",indianreputationalriskdatabase.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",indianreputationalriskdatabase.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",indianreputationalriskdatabase.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",indianreputationalriskdatabase.readPaymentProofs);
router.put("/:caseId/:componentId",indianreputationalriskdatabase.update);
router.put("/updatedataentrystatus/:caseId/:componentId",indianreputationalriskdatabase.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",indianreputationalriskdatabase.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",indianreputationalriskdatabase.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",indianreputationalriskdatabase.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",indianreputationalriskdatabase.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",indianreputationalriskdatabase.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",indianreputationalriskdatabase.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",indianreputationalriskdatabase.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",indianreputationalriskdatabase.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",indianreputationalriskdatabase.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",indianreputationalriskdatabase.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",indianreputationalriskdatabase.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",indianreputationalriskdatabase.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",indianreputationalriskdatabase.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",indianreputationalriskdatabase.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",indianreputationalriskdatabase.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",indianreputationalriskdatabase.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",indianreputationalriskdatabase.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",indianreputationalriskdatabase.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",indianreputationalriskdatabase.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",indianreputationalriskdatabase.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",indianreputationalriskdatabase.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",indianreputationalriskdatabase.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",indianreputationalriskdatabase.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",indianreputationalriskdatabase.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",indianreputationalriskdatabase.addNote);
router.get("/findcomponentsfor/:for",indianreputationalriskdatabase.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",indianreputationalriskdatabase.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",indianreputationalriskdatabase.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",indianreputationalriskdatabase.reinitiateCheck);
router.post("/addquicknote", indianreputationalriskdatabase.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", indianreputationalriskdatabase.getAllquicknoteForACheck)
module.exports = router;
