const excelUpload = require('../controllers/uploads/excel_upload.controller');
const express = require('express');
const router = express.Router();

router.post("/",excelUpload.create);
router.get("/",excelUpload.findAllReferenceNumbersWhereStatusIsOpen);
router.get("/:referenceNumber",excelUpload.findForOneReferenceNumber);
router.get("/clientssubclients/:clientSubclientIds",excelUpload.findAllExcelUploadsForAListOfClientsAndSubclients);
module.exports = router;