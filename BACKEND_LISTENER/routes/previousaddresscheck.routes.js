
const previousaddresscheck = require('../controllers/data_entry/previousaddresscheck.controller');
const express = require('express');
const router = express.Router();


router.post("/",previousaddresscheck.create);
router.get("/:case",previousaddresscheck.findAllForACase);
router.get("/findone/:caseId/:componentId",previousaddresscheck.findOne);
router.post("/uploadfile",previousaddresscheck.uploadFile);
router.post("/uploadproofofwork",previousaddresscheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",previousaddresscheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",previousaddresscheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",previousaddresscheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",previousaddresscheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",previousaddresscheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",previousaddresscheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",previousaddresscheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",previousaddresscheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",previousaddresscheck.readPaymentProofs);
router.put("/:caseId/:componentId",previousaddresscheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",previousaddresscheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",previousaddresscheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",previousaddresscheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",previousaddresscheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",previousaddresscheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",previousaddresscheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",previousaddresscheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",previousaddresscheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",previousaddresscheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",previousaddresscheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",previousaddresscheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",previousaddresscheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",previousaddresscheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",previousaddresscheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",previousaddresscheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",previousaddresscheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",previousaddresscheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",previousaddresscheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",previousaddresscheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",previousaddresscheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",previousaddresscheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",previousaddresscheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",previousaddresscheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",previousaddresscheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",previousaddresscheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",previousaddresscheck.addNote);
router.get("/findcomponentsfor/:for",previousaddresscheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",previousaddresscheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",previousaddresscheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",previousaddresscheck.reinitiateCheck);
// router.get("/",previousaddresscheck.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", previousaddresscheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", previousaddresscheck.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", previousaddresscheck.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", previousaddresscheck.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        