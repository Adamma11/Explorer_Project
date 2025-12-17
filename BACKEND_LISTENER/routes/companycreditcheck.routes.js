
const companycreditcheck = require('../controllers/data_entry/companycreditcheck.controller');
const express = require('express');
const router = express.Router();


router.post("/",companycreditcheck.create);
router.get("/:case",companycreditcheck.findAllForACase);
router.get("/findone/:caseId/:componentId",companycreditcheck.findOne);
router.post("/uploadfile",companycreditcheck.uploadFile);
router.post("/uploadproofofwork",companycreditcheck.uploadProofOfWork);
router.post("/uploadpvproofofwork",companycreditcheck.uploadPvProofOfWork);
router.post("/uploadpaymentproof",companycreditcheck.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",companycreditcheck.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",companycreditcheck.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",companycreditcheck.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",companycreditcheck.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",companycreditcheck.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",companycreditcheck.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",companycreditcheck.readPaymentProofs);
router.put("/:caseId/:componentId",companycreditcheck.update);
router.put("/updatedataentrystatus/:caseId/:componentId",companycreditcheck.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",companycreditcheck.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",companycreditcheck.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",companycreditcheck.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",companycreditcheck.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",companycreditcheck.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",companycreditcheck.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",companycreditcheck.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",companycreditcheck.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",companycreditcheck.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",companycreditcheck.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",companycreditcheck.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",companycreditcheck.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",companycreditcheck.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",companycreditcheck.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",companycreditcheck.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",companycreditcheck.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",companycreditcheck.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",companycreditcheck.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",companycreditcheck.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",companycreditcheck.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",companycreditcheck.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",companycreditcheck.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",companycreditcheck.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",companycreditcheck.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",companycreditcheck.addNote);
router.get("/findcomponentsfor/:for",companycreditcheck.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",companycreditcheck.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",companycreditcheck.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",companycreditcheck.reinitiateCheck);
// router.get("/",companycreditcheck.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", companycreditcheck.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", companycreditcheck.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", companycreditcheck.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", companycreditcheck.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        