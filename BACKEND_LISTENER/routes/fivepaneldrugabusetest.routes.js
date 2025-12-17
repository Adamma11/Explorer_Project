
const fivepaneldrugabusetest = require('../controllers/data_entry/fivepaneldrugabusetest.controller');
const express = require('express');
const router = express.Router();


router.post("/",fivepaneldrugabusetest.create);
router.get("/:case",fivepaneldrugabusetest.findAllForACase);
router.get("/findone/:caseId/:componentId",fivepaneldrugabusetest.findOne);
router.post("/uploadfile",fivepaneldrugabusetest.uploadFile);
router.post("/uploadproofofwork",fivepaneldrugabusetest.uploadProofOfWork);
router.post("/uploadpvproofofwork",fivepaneldrugabusetest.uploadPvProofOfWork);
router.post("/uploadpaymentproof",fivepaneldrugabusetest.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",fivepaneldrugabusetest.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",fivepaneldrugabusetest.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",fivepaneldrugabusetest.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",fivepaneldrugabusetest.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",fivepaneldrugabusetest.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",fivepaneldrugabusetest.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",fivepaneldrugabusetest.readPaymentProofs);
router.put("/:caseId/:componentId",fivepaneldrugabusetest.update);
router.put("/updatedataentrystatus/:caseId/:componentId",fivepaneldrugabusetest.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",fivepaneldrugabusetest.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",fivepaneldrugabusetest.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",fivepaneldrugabusetest.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",fivepaneldrugabusetest.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",fivepaneldrugabusetest.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",fivepaneldrugabusetest.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",fivepaneldrugabusetest.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",fivepaneldrugabusetest.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",fivepaneldrugabusetest.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",fivepaneldrugabusetest.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",fivepaneldrugabusetest.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",fivepaneldrugabusetest.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",fivepaneldrugabusetest.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",fivepaneldrugabusetest.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",fivepaneldrugabusetest.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",fivepaneldrugabusetest.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",fivepaneldrugabusetest.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",fivepaneldrugabusetest.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",fivepaneldrugabusetest.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",fivepaneldrugabusetest.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",fivepaneldrugabusetest.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",fivepaneldrugabusetest.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",fivepaneldrugabusetest.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",fivepaneldrugabusetest.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",fivepaneldrugabusetest.addNote);
router.get("/findcomponentsfor/:for",fivepaneldrugabusetest.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",fivepaneldrugabusetest.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",fivepaneldrugabusetest.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",fivepaneldrugabusetest.reinitiateCheck);
// router.get("/",fivepaneldrugabusetest.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", fivepaneldrugabusetest.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", fivepaneldrugabusetest.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", fivepaneldrugabusetest.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", fivepaneldrugabusetest.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        