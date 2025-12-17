
const gsa = require('../controllers/data_entry/gsa.controller');
const express = require('express');
const router = express.Router();


router.post("/",gsa.create);
router.get("/:case",gsa.findAllForACase);
router.get("/findone/:caseId/:componentId",gsa.findOne);
router.post("/uploadfile",gsa.uploadFile);
router.post("/uploadproofofwork",gsa.uploadProofOfWork);
router.post("/uploadpvproofofwork",gsa.uploadPvProofOfWork);
router.post("/uploadpaymentproof",gsa.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",gsa.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",gsa.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",gsa.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",gsa.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",gsa.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",gsa.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",gsa.readPaymentProofs);
router.put("/:caseId/:componentId",gsa.update);
router.put("/updatedataentrystatus/:caseId/:componentId",gsa.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",gsa.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",gsa.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",gsa.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",gsa.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",gsa.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",gsa.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",gsa.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",gsa.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",gsa.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",gsa.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",gsa.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",gsa.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",gsa.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",gsa.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",gsa.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",gsa.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",gsa.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",gsa.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",gsa.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",gsa.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",gsa.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",gsa.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",gsa.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",gsa.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",gsa.addNote);
router.get("/findcomponentsfor/:for",gsa.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",gsa.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",gsa.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",gsa.reinitiateCheck);
// router.get("/",gsa.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", gsa.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", gsa.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", gsa.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", gsa.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        