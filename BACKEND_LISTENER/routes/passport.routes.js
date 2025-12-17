
const passport = require('../controllers/data_entry/passport.controller');
const express = require('express');
const router = express.Router();


router.post("/",passport.create);
router.get("/:case",passport.findAllForACase);
router.get("/findone/:caseId/:componentId",passport.findOne);
router.post("/uploadfile",passport.uploadFile);
router.post("/uploadproofofwork",passport.uploadProofOfWork);
router.post("/uploadpvproofofwork",passport.uploadPvProofOfWork);
router.post("/uploadpaymentproof",passport.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",passport.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",passport.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",passport.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",passport.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",passport.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",passport.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",passport.readPaymentProofs);
router.put("/:caseId/:componentId",passport.update);
router.put("/updatedataentrystatus/:caseId/:componentId",passport.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",passport.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",passport.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",passport.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",passport.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",passport.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",passport.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",passport.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",passport.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",passport.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",passport.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",passport.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",passport.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",passport.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",passport.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",passport.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",passport.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",passport.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",passport.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",passport.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",passport.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",passport.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",passport.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",passport.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",passport.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",passport.addNote);
router.get("/findcomponentsfor/:for",passport.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",passport.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",passport.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",passport.reinitiateCheck);
// router.get("/",passport.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", passport.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", passport.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", passport.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", passport.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        