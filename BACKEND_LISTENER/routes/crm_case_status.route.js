const express=require('express');
const router = express.Router();
const crmCaseStatus = require('../controllers/support/crm_case_status.controller');

router.get('/getAllComponents',crmCaseStatus.findComponents);
router.get('/getclient/:client_id', crmCaseStatus.getCLientContractComponents);
router.get('/getclientCases/:client_id', crmCaseStatus.getCLientCases);

module.exports=router;
