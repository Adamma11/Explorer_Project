
const cfbusa = require('../controllers/data_entry/cfbusa.controller');
const express = require('express');
const router = express.Router();


router.post("/",cfbusa.create);
router.get("/:case",cfbusa.findAllForACase);
router.get("/findone/:caseId/:componentId",cfbusa.findOne);
router.post("/uploadfile",cfbusa.uploadFile);
router.post("/uploadproofofwork",cfbusa.uploadProofOfWork);
router.post("/uploadpvproofofwork",cfbusa.uploadPvProofOfWork);
router.post("/uploadpaymentproof",cfbusa.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",cfbusa.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",cfbusa.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",cfbusa.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",cfbusa.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",cfbusa.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",cfbusa.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",cfbusa.readPaymentProofs);
router.put("/:caseId/:componentId",cfbusa.update);
router.put("/updatedataentrystatus/:caseId/:componentId",cfbusa.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",cfbusa.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",cfbusa.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",cfbusa.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",cfbusa.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",cfbusa.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",cfbusa.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",cfbusa.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",cfbusa.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",cfbusa.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",cfbusa.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",cfbusa.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",cfbusa.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",cfbusa.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",cfbusa.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",cfbusa.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",cfbusa.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",cfbusa.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",cfbusa.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",cfbusa.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",cfbusa.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",cfbusa.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",cfbusa.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",cfbusa.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",cfbusa.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",cfbusa.addNote);
router.get("/findcomponentsfor/:for",cfbusa.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",cfbusa.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",cfbusa.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",cfbusa.reinitiateCheck);
// router.get("/",cfbusa.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", cfbusa.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", cfbusa.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", cfbusa.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", cfbusa.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        