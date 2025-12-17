const educationcomprehensive = require('../controllers/data_entry/educationcomprehensive.controller');
const express = require('express');
const router = express.Router();

router.post("/",educationcomprehensive.createForCde);
//router.get("/:case",educationcomprehensive.findAllForACase);
router.get("/findone/:caseId/:serialNumber",educationcomprehensive.findOneForCde);
router.post("/uploadfile",educationcomprehensive.uploadFileForCde);
//router.post("/uploadproofofwork",educationcomprehensive.uploadProofOfWork);
//router.post("/uploadpvproofofwork",educationcomprehensive.uploadPvProofOfWork);
//router.post("/uploadpaymentproof",educationcomprehensive.uploadPaymentProof);
router.delete("/deletefile/:caseId/:componentName/:componentId",educationcomprehensive.deleteFileForCde);
router.delete("/deleteallfiles/:caseId/:componentName/:componentId",educationcomprehensive.deleteAllFilesForCde);
router.get("/downloadfile/:caseId/:componentName/:componentId",educationcomprehensive.downloadFileForCde);
//router.get("/downloadproofofwork/:caseId/:componentName/:componentId",educationcomprehensive.downloadProofOfWork);
//router.get("/downloadpaymentproof/:caseId/:componentName/:componentId",educationcomprehensive.downloadPaymentProof);
router.get("/readfilenames/:caseId/:componentName/:componentId",educationcomprehensive.readFileNamesForCde);
/*router.get("/readproofofworks/:caseId/:componentName/:componentId",educationcomprehensive.readProofOfWorks);
router.get("/readpaymentproofs/:caseId/:componentName/:componentId",educationcomprehensive.readPaymentProofs);
router.put("/:caseId/:componentId",educationcomprehensive.update);
router.put("/updatedataentrystatus/:caseId/:componentId",educationcomprehensive.updateDataEntryStatus);
router.put("/updateinputqcstatus/:caseId/:componentId",educationcomprehensive.updateInputqcStatus);
router.put("/updateverificationstatus/:caseId/:componentId",educationcomprehensive.updateVerificationStatus);
router.put("/updatefeverificationstatus/:caseId/:componentId",educationcomprehensive.updateFeVerificationStatus);
router.put("/updatevendorverificationstatus/:caseId/:componentId",educationcomprehensive.updateVendorVerificationStatus);
router.put("/updateverifierreviewstatus/:caseId/:componentId",educationcomprehensive.updateVerifierReviewStatus);
router.put("/updatementorreviewstatus/:caseId/:componentId",educationcomprehensive.updateMentorReviewStatus);
router.put("/updateoutputqcstatus/:caseId/:componentId",educationcomprehensive.updateOutputqcStatus);
router.put("/approveinsuff2/:caseId/:componentId",educationcomprehensive.approveInsuff2);
router.put("/rejectinsuff2/:caseId/:componentId",educationcomprehensive.rejectInsuff2);
router.put("/clearinsuff1/:caseId/:componentId",educationcomprehensive.clearInsuff1);
router.put("/clearinsuff2/:caseId/:componentId",educationcomprehensive.clearInsuff2);
router.put("/rejectinsuff1clearance/:caseId/:componentId",educationcomprehensive.rejectInsuff1Clearance);
router.put("/rejectinsuff2clearance/:caseId/:componentId",educationcomprehensive.rejectInsuff2Clearance);
router.put("/allocatechecktomyself/:caseId/:componentId",educationcomprehensive.allocateCheckToMyself);
router.get("/user/getallchecksallocatedtomeforverification",educationcomprehensive.getAllChecksAllocatedToMeForVerification);
router.get("/insuff/insuffforclient",educationcomprehensive.getInsuffForClient);
router.get("/insuff/insuffforscrutiny",educationcomprehensive.getInsuffForScrutiny);
router.put("/approveinsuffclearance/:caseId/:componentId",educationcomprehensive.approveInsuffClearance);
router.delete("/deletecheck/case/:caseId/component/:componentId",educationcomprehensive.deleteCheck);
router.put("/putittofebucket/:caseId/:componentId",educationcomprehensive.putItToFeBucket);
router.put("/putittovendorbucket/:caseId/:componentId",educationcomprehensive.putItToVendorBucket);
router.put("/allocatechecktofe/:caseId/:componentId",educationcomprehensive.allocateCheckToFe);
router.put("/allocatechecktovendor/:caseId/:componentId",educationcomprehensive.allocateCheckToVendor);
router.put("/allocatechecktoverifier/:caseId/:componentId",educationcomprehensive.allocateCheckToVerifier);
router.put("/addnote/:caseId/:componentId",educationcomprehensive.addNote);
router.get("/findcomponentsfor/:for",educationcomprehensive.findComponentsFor)
router.get("/findcomponentsforvendormanager/:status",educationcomprehensive.findComponentsForVendorManager)
router.get("/find/unallocated/verification/",educationcomprehensive.findUnallocatedComponentsForVerification)
router.put("/reinitiatecheck/:caseId/:componentId",educationcomprehensive.reinitiateCheck);*/
module.exports = router;
