const fivepaneldrugabusewithnicotine = require('../controllers/data_entry/fivepaneldrugabusewithnicotine.controller');
const express = require('express');
const router = express.Router();

router.post("/",fivepaneldrugabusewithnicotine.create);
router.get("/:case",fivepaneldrugabusewithnicotine.findAllForACase);
router.get("/findone/:caseId/:componentId",fivepaneldrugabusewithnicotine.findOne);
router.post("/uploadfile",fivepaneldrugabusewithnicotine.uploadFile);
router.post("/uploadproofofwork",fivepaneldrugabusewithnicotine.uploadProofOfWork);
router.post("/uploadpvproofofwork",fivepaneldrugabusewithnicotine.uploadPvProofOfWork);
router.post("/uploadpaymentproof",fivepaneldrugabusewithnicotine.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",fivepaneldrugabusewithnicotine.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",fivepaneldrugabusewithnicotine.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",fivepaneldrugabusewithnicotine.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",fivepaneldrugabusewithnicotine.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",fivepaneldrugabusewithnicotine.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",fivepaneldrugabusewithnicotine.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",fivepaneldrugabusewithnicotine.readPaymentProofs);
router.put("/:caseId/:componentId",fivepaneldrugabusewithnicotine.update);
router.put("/updatedataentrystatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",fivepaneldrugabusewithnicotine.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",fivepaneldrugabusewithnicotine.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",fivepaneldrugabusewithnicotine.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",fivepaneldrugabusewithnicotine.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",fivepaneldrugabusewithnicotine.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",fivepaneldrugabusewithnicotine.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",fivepaneldrugabusewithnicotine.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",fivepaneldrugabusewithnicotine.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",fivepaneldrugabusewithnicotine.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",fivepaneldrugabusewithnicotine.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",fivepaneldrugabusewithnicotine.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",fivepaneldrugabusewithnicotine.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",fivepaneldrugabusewithnicotine.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",fivepaneldrugabusewithnicotine.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",fivepaneldrugabusewithnicotine.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",fivepaneldrugabusewithnicotine.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",fivepaneldrugabusewithnicotine.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",fivepaneldrugabusewithnicotine.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",fivepaneldrugabusewithnicotine.addNote);
router.get("/findcomponentsfor/:for",fivepaneldrugabusewithnicotine.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",fivepaneldrugabusewithnicotine.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",fivepaneldrugabusewithnicotine.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",fivepaneldrugabusewithnicotine.reinitiateCheck);
router.post("/addquicknote", fivepaneldrugabusewithnicotine.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", fivepaneldrugabusewithnicotine.getAllquicknoteForACheck)
module.exports = router;
