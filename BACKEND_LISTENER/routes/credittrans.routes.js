const credittrans = require('../controllers/data_entry/credittrans.controller');
const express = require('express');
const router = express.Router();

router.post("/",credittrans.create);
router.get("/:case",credittrans.findAllForACase);
router.get("/findone/:caseId/:componentId",credittrans.findOne);
router.post("/uploadfile",credittrans.uploadFile);
router.post("/uploadproofofwork",credittrans.uploadProofOfWork);
router.post("/uploadpvproofofwork",credittrans.uploadPvProofOfWork);
router.post("/uploadpaymentproof",credittrans.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",credittrans.deleteFile);
router.delete("/deleteproofofwork/:caseId/:componentName/:componentId",credittrans.deleteProofOfWork);
router.get("/downloadfile/:caseId/:componentName/:componentId",credittrans.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",credittrans.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",credittrans.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",credittrans.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",credittrans.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",credittrans.readPaymentProofs);
router.put("/:caseId/:componentId",credittrans.update);
router.put("/updatedataentrystatus/:caseId/:componentId",credittrans.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",credittrans.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",credittrans.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",credittrans.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",credittrans.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",credittrans.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",credittrans.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",credittrans.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",credittrans.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",credittrans.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",credittrans.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",credittrans.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",credittrans.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",credittrans.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",credittrans.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",credittrans.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",credittrans.getInsuffForClient);
router.get("/insuff/searchacaseininsuffforclient",credittrans.searchACaseForInsuffForClient);
router.get("/insuff/insuffforscrutiny",credittrans.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",credittrans.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",credittrans.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",credittrans.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",credittrans.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",credittrans.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",credittrans.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",credittrans.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",credittrans.addNote);
router.get("/findcomponentsfor/:for",credittrans.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",credittrans.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",credittrans.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",credittrans.reinitiateCheck);
router.get("/",credittrans.getChecksWhereGradeOneIsNullAndGradeNotNull)
module.exports = router;
