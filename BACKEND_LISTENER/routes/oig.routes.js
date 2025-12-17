
const oig = require('../controllers/data_entry/oig.controller');
const express = require('express');
const router = express.Router();


router.post("/",oig.create);
router.get("/:case",oig.findAllForACase);
router.get("/findone/:caseId/:componentId",oig.findOne);
router.post("/uploadfile",oig.uploadFile);
router.post("/uploadproofofwork",oig.uploadProofOfWork);
router.post("/uploadpvproofofwork",oig.uploadPvProofOfWork);
router.post("/uploadpaymentproof",oig.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",oig.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",oig.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",oig.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",oig.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",oig.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",oig.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",oig.readPaymentProofs);
router.put("/:caseId/:componentId",oig.update);
router.put("/updatedataentrystatus/:caseId/:componentId",oig.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",oig.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",oig.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",oig.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",oig.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",oig.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",oig.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",oig.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",oig.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",oig.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",oig.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",oig.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",oig.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",oig.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",oig.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",oig.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",oig.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",oig.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",oig.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",oig.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",oig.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",oig.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",oig.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",oig.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",oig.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",oig.addNote);
router.get("/findcomponentsfor/:for",oig.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",oig.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",oig.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",oig.reinitiateCheck);
// router.get("/",oig.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", oig.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", oig.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", oig.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", oig.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        