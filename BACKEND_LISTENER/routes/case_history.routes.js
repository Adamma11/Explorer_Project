const caseHistory = require('../controllers/data_entry/case_history.controller')
const express = require('express');
const router = express.Router();

router.get('/case/:case',caseHistory.getCaseHistory)
router.get('/case/:case/component/:component/check/:check',caseHistory.getCheckHistory)
router.get('/case_Id/:case', caseHistory.getCaseHistoryWithoutComponent)
//new 06-jan-23
router.get("/caseHistoryToExcel", caseHistory.exportCaseHistory)
module.exports = router;
