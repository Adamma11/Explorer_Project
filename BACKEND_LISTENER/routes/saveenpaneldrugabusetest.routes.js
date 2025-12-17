
const saveenpaneldrugabusetest = require('../controllers/data_entry/saveenpaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();


router.post("/",saveenpaneldrugabusetest.create);
router.get("/:case",saveenpaneldrugabusetest.findAllForACase);
router.get("/findone/:caseId/:componentId",saveenpaneldrugabusetest.findOne);
router.post("/uploadfile",saveenpaneldrugabusetest.uploadFile);
router.post("/uploadproofofwork",saveenpaneldrugabusetest.uploadProofOfWork);
router.post("/uploadpvproofofwork",saveenpaneldrugabusetest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",saveenpaneldrugabusetest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",saveenpaneldrugabusetest.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",saveenpaneldrugabusetest.readPaymentProofs);
router.put("/:caseId/:componentId",saveenpaneldrugabusetest.update);
router.put("/updatedataentrystatus/:caseId/:componentId",saveenpaneldrugabusetest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",saveenpaneldrugabusetest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",saveenpaneldrugabusetest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",saveenpaneldrugabusetest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",saveenpaneldrugabusetest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",saveenpaneldrugabusetest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",saveenpaneldrugabusetest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",saveenpaneldrugabusetest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",saveenpaneldrugabusetest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",saveenpaneldrugabusetest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",saveenpaneldrugabusetest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",saveenpaneldrugabusetest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",saveenpaneldrugabusetest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",saveenpaneldrugabusetest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",saveenpaneldrugabusetest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",saveenpaneldrugabusetest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",saveenpaneldrugabusetest.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",saveenpaneldrugabusetest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",saveenpaneldrugabusetest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",saveenpaneldrugabusetest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",saveenpaneldrugabusetest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",saveenpaneldrugabusetest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",saveenpaneldrugabusetest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",saveenpaneldrugabusetest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",saveenpaneldrugabusetest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",saveenpaneldrugabusetest.addNote);
router.get("/findcomponentsfor/:for",saveenpaneldrugabusetest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",saveenpaneldrugabusetest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",saveenpaneldrugabusetest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",saveenpaneldrugabusetest.reinitiateCheck);
// router.get("/",saveenpaneldrugabusetest.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", saveenpaneldrugabusetest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", saveenpaneldrugabusetest.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", saveenpaneldrugabusetest.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", saveenpaneldrugabusetest.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        