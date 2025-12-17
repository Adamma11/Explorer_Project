
const directorpropritorresidence = require('../controllers/data_entry/directorpropritorresidence.controller');
const express = require('express');
const router = express.Router();


router.post("/",directorpropritorresidence.create);
router.get("/:case",directorpropritorresidence.findAllForACase);
router.get("/findone/:caseId/:componentId",directorpropritorresidence.findOne);
router.post("/uploadfile",directorpropritorresidence.uploadFile);
router.post("/uploadproofofwork",directorpropritorresidence.uploadProofOfWork);
router.post("/uploadpvproofofwork",directorpropritorresidence.uploadPvProofOfWork);
router.post("/uploadpaymentproof",directorpropritorresidence.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",directorpropritorresidence.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",directorpropritorresidence.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",directorpropritorresidence.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",directorpropritorresidence.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",directorpropritorresidence.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",directorpropritorresidence.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",directorpropritorresidence.readPaymentProofs);
router.put("/:caseId/:componentId",directorpropritorresidence.update);
router.put("/updatedataentrystatus/:caseId/:componentId",directorpropritorresidence.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",directorpropritorresidence.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",directorpropritorresidence.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",directorpropritorresidence.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",directorpropritorresidence.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",directorpropritorresidence.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",directorpropritorresidence.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",directorpropritorresidence.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",directorpropritorresidence.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",directorpropritorresidence.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",directorpropritorresidence.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",directorpropritorresidence.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",directorpropritorresidence.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",directorpropritorresidence.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",directorpropritorresidence.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",directorpropritorresidence.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",directorpropritorresidence.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",directorpropritorresidence.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",directorpropritorresidence.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",directorpropritorresidence.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",directorpropritorresidence.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",directorpropritorresidence.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",directorpropritorresidence.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",directorpropritorresidence.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",directorpropritorresidence.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",directorpropritorresidence.addNote);
router.get("/findcomponentsfor/:for",directorpropritorresidence.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",directorpropritorresidence.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",directorpropritorresidence.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",directorpropritorresidence.reinitiateCheck);
// router.get("/",directorpropritorresidence.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", directorpropritorresidence.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", directorpropritorresidence.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", directorpropritorresidence.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", directorpropritorresidence.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        