
const employment = require('../controllers/data_entry/employment.controller');
const express = require('express');
const router = express.Router();

router.get("/searchempbasicmaster", employment.getNamesFromEmploymentMasters);

router.post("/",employment.create);
router.get("/:case",employment.findAllForACase);
router.get("/findone/:caseId/:componentId",employment.findOne);
router.post("/uploadfile",employment.uploadFile);
router.post("/uploadproofofwork",employment.uploadProofOfWork);
router.post("/uploadpvproofofwork",employment.uploadPvProofOfWork);
router.post("/uploadpaymentproof",employment.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",employment.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",employment.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",employment.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",employment.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",employment.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",employment.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",employment.readPaymentProofs);
router.put("/:caseId/:componentId",employment.update);
router.put("/updatedataentrystatus/:caseId/:componentId",employment.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",employment.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",employment.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",employment.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",employment.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",employment.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",employment.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",employment.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",employment.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",employment.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",employment.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",employment.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",employment.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",employment.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",employment.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",employment.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",employment.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",employment.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",employment.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",employment.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",employment.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",employment.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",employment.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",employment.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",employment.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",employment.addNote);
router.get("/findcomponentsfor/:for",employment.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",employment.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",employment.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",employment.reinitiateCheck);
// router.get("/",employment.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", employment.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", employment.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
//router.get("/searchInstitutionsFromMasters", employment.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", employment.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        
