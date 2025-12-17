
const mca = require('../controllers/data_entry/mca.controller');
const express = require('express');
const router = express.Router();


router.post("/",mca.create);
router.get("/:case",mca.findAllForACase);
router.get("/findone/:caseId/:componentId",mca.findOne);
router.post("/uploadfile",mca.uploadFile);
router.post("/uploadproofofwork",mca.uploadProofOfWork);
router.post("/uploadpvproofofwork",mca.uploadPvProofOfWork);
router.post("/uploadpaymentproof",mca.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",mca.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",mca.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",mca.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",mca.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",mca.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",mca.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",mca.readPaymentProofs);
router.put("/:caseId/:componentId",mca.update);
router.put("/updatedataentrystatus/:caseId/:componentId",mca.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",mca.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",mca.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",mca.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",mca.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",mca.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",mca.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",mca.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",mca.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",mca.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",mca.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",mca.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",mca.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",mca.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",mca.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",mca.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",mca.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",mca.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",mca.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",mca.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",mca.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",mca.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",mca.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",mca.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",mca.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",mca.addNote);
router.get("/findcomponentsfor/:for",mca.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",mca.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",mca.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",mca.reinitiateCheck);
// router.get("/",mca.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", mca.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", mca.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", mca.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", mca.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        