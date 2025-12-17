
const fourpaneldrugabusecheck = require('../controllers/data_entry/fourpaneldrugabusecheck.controller');
const express = require('express');
const router = express.Router();


router.post("/",fourpaneldrugabusecheck.create);
router.get("/:case",fourpaneldrugabusecheck.findAllForACase);
router.get("/findone/:caseId/:componentId",fourpaneldrugabusecheck.findOne);
router.post("/uploadfile",fourpaneldrugabusecheck.uploadFile);
router.post("/uploadproofofwork",fourpaneldrugabusecheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",fourpaneldrugabusecheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",fourpaneldrugabusecheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",fourpaneldrugabusecheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",fourpaneldrugabusecheck.readPaymentProofs);
router.put("/:caseId/:componentId",fourpaneldrugabusecheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",fourpaneldrugabusecheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",fourpaneldrugabusecheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",fourpaneldrugabusecheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",fourpaneldrugabusecheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",fourpaneldrugabusecheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",fourpaneldrugabusecheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",fourpaneldrugabusecheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",fourpaneldrugabusecheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",fourpaneldrugabusecheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",fourpaneldrugabusecheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",fourpaneldrugabusecheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",fourpaneldrugabusecheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",fourpaneldrugabusecheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",fourpaneldrugabusecheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",fourpaneldrugabusecheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",fourpaneldrugabusecheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",fourpaneldrugabusecheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",fourpaneldrugabusecheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",fourpaneldrugabusecheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",fourpaneldrugabusecheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",fourpaneldrugabusecheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",fourpaneldrugabusecheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",fourpaneldrugabusecheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",fourpaneldrugabusecheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",fourpaneldrugabusecheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",fourpaneldrugabusecheck.addNote);
router.get("/findcomponentsfor/:for",fourpaneldrugabusecheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",fourpaneldrugabusecheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",fourpaneldrugabusecheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",fourpaneldrugabusecheck.reinitiateCheck);
// router.get("/",fourpaneldrugabusecheck.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", fourpaneldrugabusecheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", fourpaneldrugabusecheck.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", fourpaneldrugabusecheck.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", fourpaneldrugabusecheck.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        