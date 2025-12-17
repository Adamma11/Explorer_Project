
const tenpaneldrugabusetest = require('../controllers/data_entry/tenpaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();


router.post("/",tenpaneldrugabusetest.create);
router.get("/:case",tenpaneldrugabusetest.findAllForACase);
router.get("/findone/:caseId/:componentId",tenpaneldrugabusetest.findOne);
router.post("/uploadfile",tenpaneldrugabusetest.uploadFile);
router.post("/uploadproofofwork",tenpaneldrugabusetest.uploadProofOfWork);
router.post("/uploadpvproofofwork",tenpaneldrugabusetest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",tenpaneldrugabusetest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",tenpaneldrugabusetest.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",tenpaneldrugabusetest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",tenpaneldrugabusetest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",tenpaneldrugabusetest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",tenpaneldrugabusetest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",tenpaneldrugabusetest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",tenpaneldrugabusetest.readPaymentProofs);
router.put("/:caseId/:componentId",tenpaneldrugabusetest.update);
router.put("/updatedataentrystatus/:caseId/:componentId",tenpaneldrugabusetest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",tenpaneldrugabusetest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",tenpaneldrugabusetest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",tenpaneldrugabusetest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",tenpaneldrugabusetest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",tenpaneldrugabusetest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",tenpaneldrugabusetest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",tenpaneldrugabusetest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",tenpaneldrugabusetest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",tenpaneldrugabusetest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",tenpaneldrugabusetest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",tenpaneldrugabusetest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",tenpaneldrugabusetest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",tenpaneldrugabusetest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",tenpaneldrugabusetest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",tenpaneldrugabusetest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",tenpaneldrugabusetest.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",tenpaneldrugabusetest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",tenpaneldrugabusetest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",tenpaneldrugabusetest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",tenpaneldrugabusetest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",tenpaneldrugabusetest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",tenpaneldrugabusetest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",tenpaneldrugabusetest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",tenpaneldrugabusetest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",tenpaneldrugabusetest.addNote);
router.get("/findcomponentsfor/:for",tenpaneldrugabusetest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",tenpaneldrugabusetest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",tenpaneldrugabusetest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",tenpaneldrugabusetest.reinitiateCheck);
// router.get("/",tenpaneldrugabusetest.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", tenpaneldrugabusetest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", tenpaneldrugabusetest.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", tenpaneldrugabusetest.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", tenpaneldrugabusetest.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        