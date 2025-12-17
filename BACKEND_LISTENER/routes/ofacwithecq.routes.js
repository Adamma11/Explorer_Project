
const ofacwithecq = require('../controllers/data_entry/ofacwithecq.controller');
const express = require('express');
const router = express.Router();


router.post("/",ofacwithecq.create);
router.get("/:case",ofacwithecq.findAllForACase);
router.get("/findone/:caseId/:componentId",ofacwithecq.findOne);
router.post("/uploadfile",ofacwithecq.uploadFile);
router.post("/uploadproofofwork",ofacwithecq.uploadProofOfWork);
router.post("/uploadpvproofofwork",ofacwithecq.uploadPvProofOfWork);
router.post("/uploadpaymentproof",ofacwithecq.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",ofacwithecq.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",ofacwithecq.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",ofacwithecq.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",ofacwithecq.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",ofacwithecq.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",ofacwithecq.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",ofacwithecq.readPaymentProofs);
router.put("/:caseId/:componentId",ofacwithecq.update);
router.put("/updatedataentrystatus/:caseId/:componentId",ofacwithecq.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",ofacwithecq.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",ofacwithecq.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",ofacwithecq.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",ofacwithecq.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",ofacwithecq.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",ofacwithecq.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",ofacwithecq.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",ofacwithecq.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",ofacwithecq.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",ofacwithecq.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",ofacwithecq.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",ofacwithecq.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",ofacwithecq.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",ofacwithecq.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",ofacwithecq.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",ofacwithecq.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",ofacwithecq.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",ofacwithecq.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",ofacwithecq.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",ofacwithecq.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",ofacwithecq.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",ofacwithecq.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",ofacwithecq.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",ofacwithecq.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",ofacwithecq.addNote);
router.get("/findcomponentsfor/:for",ofacwithecq.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",ofacwithecq.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",ofacwithecq.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",ofacwithecq.reinitiateCheck);
// router.get("/",ofacwithecq.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", ofacwithecq.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", ofacwithecq.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", ofacwithecq.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", ofacwithecq.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        