
const occeausa = require('../controllers/data_entry/occeausa.controller');
const express = require('express');
const router = express.Router();


router.post("/",occeausa.create);
router.get("/:case",occeausa.findAllForACase);
router.get("/findone/:caseId/:componentId",occeausa.findOne);
router.post("/uploadfile",occeausa.uploadFile);
router.post("/uploadproofofwork",occeausa.uploadProofOfWork);
router.post("/uploadpvproofofwork",occeausa.uploadPvProofOfWork);
router.post("/uploadpaymentproof",occeausa.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",occeausa.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",occeausa.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",occeausa.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",occeausa.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",occeausa.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",occeausa.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",occeausa.readPaymentProofs);
router.put("/:caseId/:componentId",occeausa.update);
router.put("/updatedataentrystatus/:caseId/:componentId",occeausa.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",occeausa.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",occeausa.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",occeausa.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",occeausa.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",occeausa.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",occeausa.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",occeausa.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",occeausa.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",occeausa.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",occeausa.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",occeausa.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",occeausa.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",occeausa.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",occeausa.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",occeausa.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",occeausa.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",occeausa.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",occeausa.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",occeausa.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",occeausa.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",occeausa.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",occeausa.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",occeausa.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",occeausa.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",occeausa.addNote);
router.get("/findcomponentsfor/:for",occeausa.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",occeausa.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",occeausa.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",occeausa.reinitiateCheck);
// router.get("/",occeausa.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", occeausa.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", occeausa.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", occeausa.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", occeausa.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        