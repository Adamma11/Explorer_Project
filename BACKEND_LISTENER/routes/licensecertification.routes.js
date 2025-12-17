
const licensecertification = require('../controllers/data_entry/licensecertification.controller');
const express = require('express');
const router = express.Router();


router.post("/",licensecertification.create);
router.get("/:case",licensecertification.findAllForACase);
router.get("/findone/:caseId/:componentId",licensecertification.findOne);
router.post("/uploadfile",licensecertification.uploadFile);
router.post("/uploadproofofwork",licensecertification.uploadProofOfWork);
router.post("/uploadpvproofofwork",licensecertification.uploadPvProofOfWork);
router.post("/uploadpaymentproof",licensecertification.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",licensecertification.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",licensecertification.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",licensecertification.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",licensecertification.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",licensecertification.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",licensecertification.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",licensecertification.readPaymentProofs);
router.put("/:caseId/:componentId",licensecertification.update);
router.put("/updatedataentrystatus/:caseId/:componentId",licensecertification.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",licensecertification.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",licensecertification.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",licensecertification.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",licensecertification.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",licensecertification.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",licensecertification.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",licensecertification.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",licensecertification.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",licensecertification.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",licensecertification.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",licensecertification.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",licensecertification.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",licensecertification.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",licensecertification.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",licensecertification.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",licensecertification.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",licensecertification.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",licensecertification.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",licensecertification.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",licensecertification.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",licensecertification.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",licensecertification.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",licensecertification.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",licensecertification.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",licensecertification.addNote);
router.get("/findcomponentsfor/:for",licensecertification.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",licensecertification.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",licensecertification.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",licensecertification.reinitiateCheck);
// router.get("/",licensecertification.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", licensecertification.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", licensecertification.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", licensecertification.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", licensecertification.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        