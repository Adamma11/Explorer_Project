
const facis = require('../controllers/data_entry/facis.controller');
const express = require('express');
const router = express.Router();


router.post("/",facis.create);
router.get("/:case",facis.findAllForACase);
router.get("/findone/:caseId/:componentId",facis.findOne);
router.post("/uploadfile",facis.uploadFile);
router.post("/uploadproofofwork",facis.uploadProofOfWork);
router.post("/uploadpvproofofwork",facis.uploadPvProofOfWork);
router.post("/uploadpaymentproof",facis.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",facis.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",facis.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",facis.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",facis.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",facis.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",facis.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",facis.readPaymentProofs);
router.put("/:caseId/:componentId",facis.update);
router.put("/updatedataentrystatus/:caseId/:componentId",facis.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",facis.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",facis.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",facis.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",facis.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",facis.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",facis.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",facis.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",facis.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",facis.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",facis.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",facis.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",facis.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",facis.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",facis.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",facis.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",facis.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",facis.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",facis.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",facis.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",facis.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",facis.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",facis.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",facis.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",facis.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",facis.addNote);
router.get("/findcomponentsfor/:for",facis.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",facis.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",facis.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",facis.reinitiateCheck);
// router.get("/",facis.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", facis.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", facis.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", facis.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", facis.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        