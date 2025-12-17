
const sdn = require('../controllers/data_entry/sdn.controller');
const express = require('express');
const router = express.Router();


router.post("/",sdn.create);
router.get("/:case",sdn.findAllForACase);
router.get("/findone/:caseId/:componentId",sdn.findOne);
router.post("/uploadfile",sdn.uploadFile);
router.post("/uploadproofofwork",sdn.uploadProofOfWork);
router.post("/uploadpvproofofwork",sdn.uploadPvProofOfWork);
router.post("/uploadpaymentproof",sdn.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",sdn.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",sdn.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",sdn.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",sdn.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",sdn.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",sdn.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",sdn.readPaymentProofs);
router.put("/:caseId/:componentId",sdn.update);
router.put("/updatedataentrystatus/:caseId/:componentId",sdn.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",sdn.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",sdn.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",sdn.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",sdn.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",sdn.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",sdn.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",sdn.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",sdn.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",sdn.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",sdn.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",sdn.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",sdn.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",sdn.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",sdn.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",sdn.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",sdn.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",sdn.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",sdn.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",sdn.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",sdn.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",sdn.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",sdn.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",sdn.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",sdn.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",sdn.addNote);
router.get("/findcomponentsfor/:for",sdn.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",sdn.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",sdn.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",sdn.reinitiateCheck);
// router.get("/",sdn.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", sdn.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", sdn.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", sdn.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", sdn.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        