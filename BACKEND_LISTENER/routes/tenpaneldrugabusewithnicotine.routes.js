
const tenpaneldrugabusewithnicotine = require('../controllers/data_entry/tenpaneldrugabusewithnicotine.controller');
const express = require('express');
const router = express.Router();


router.post("/",tenpaneldrugabusewithnicotine.create);
router.get("/:case",tenpaneldrugabusewithnicotine.findAllForACase);
router.get("/findone/:caseId/:componentId",tenpaneldrugabusewithnicotine.findOne);
router.post("/uploadfile",tenpaneldrugabusewithnicotine.uploadFile);
router.post("/uploadproofofwork",tenpaneldrugabusewithnicotine.uploadProofOfWork);
router.post("/uploadpvproofofwork",tenpaneldrugabusewithnicotine.uploadPvProofOfWork);
router.post("/uploadpaymentproof",tenpaneldrugabusewithnicotine.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId/:fileName",tenpaneldrugabusewithnicotine.deleteFile);
router.get("/downloadfile/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.downloadFile);
router.get("/downloadproofofwork/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.downloadProofOfWork);
router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.readFileNames);
router.get("/readproofofworks/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",tenpaneldrugabusewithnicotine.readPaymentProofs);
router.put("/:caseId/:componentId",tenpaneldrugabusewithnicotine.update);
router.put("/updatedataentrystatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",tenpaneldrugabusewithnicotine.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",tenpaneldrugabusewithnicotine.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",tenpaneldrugabusewithnicotine.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",tenpaneldrugabusewithnicotine.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",tenpaneldrugabusewithnicotine.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",tenpaneldrugabusewithnicotine.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",tenpaneldrugabusewithnicotine.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",tenpaneldrugabusewithnicotine.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",tenpaneldrugabusewithnicotine.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",tenpaneldrugabusewithnicotine.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",tenpaneldrugabusewithnicotine.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",tenpaneldrugabusewithnicotine.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",tenpaneldrugabusewithnicotine.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",tenpaneldrugabusewithnicotine.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",tenpaneldrugabusewithnicotine.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",tenpaneldrugabusewithnicotine.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",tenpaneldrugabusewithnicotine.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",tenpaneldrugabusewithnicotine.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",tenpaneldrugabusewithnicotine.addNote);
router.get("/findcomponentsfor/:for",tenpaneldrugabusewithnicotine.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",tenpaneldrugabusewithnicotine.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",tenpaneldrugabusewithnicotine.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",tenpaneldrugabusewithnicotine.reinitiateCheck);
// router.get("/",tenpaneldrugabusewithnicotine.getChecksWhereGradeOneIsNullAndGradeNotNull);
router.post("/addquicknote", tenpaneldrugabusewithnicotine.addquicknote)
router.get("/getAllquicknoteForACheck/:case_id", tenpaneldrugabusewithnicotine.getAllquicknoteForACheck)

//added by ankush on 02/09/2024
router.get("/searchInstitutionsFromMasters", tenpaneldrugabusewithnicotine.searchInstitutionsFromMasters);
router.get("/searchInstitutionsFromMastersforanalyst/:institution", tenpaneldrugabusewithnicotine.searchInstitutionsFromMastersAnalyst)


module.exports = router;
        