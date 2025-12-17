
const pvc = require('../controllers/data_entry/pvc.controller');
const express = require('express');
const router = express.Router();


router.post("/",pvc.create);
router.get("/:case",pvc.findAllForACase);
router.get("/findone/:caseId/:componentId",pvc.findOne);
router.post("/uploadfile",pvc.uploadFile);
router.post("/uploadproofofwork",pvc.uploadProofOfWork);
router.post("/uploadpvproofofwork",pvc.uploadPvProofOfWork);
router.post("/uploadpaymentproof",pvc.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",pvc.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",pvc.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",pvc.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",pvc.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",pvc.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",pvc.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",pvc.readPaymentProofs);
router.put("/:caseId/:componentId",pvc.update);
router.put("/updatedataentrystatus/:caseId/:componentId",pvc.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",pvc.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",pvc.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",pvc.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",pvc.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",pvc.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",pvc.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",pvc.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",pvc.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",pvc.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",pvc.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",pvc.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",pvc.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",pvc.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",pvc.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",pvc.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",pvc.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",pvc.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",pvc.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",pvc.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",pvc.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",pvc.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",pvc.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",pvc.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",pvc.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",pvc.addNote);
router.get("/findcomponentsfor/:for",pvc.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",pvc.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",pvc.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",pvc.reinitiateCheck);
// router.get("/",pvc.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", pvc.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", pvc.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", pvc.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", pvc.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        