const caseInitiationController = require('../controllers/data_entry/caseInitiation.controller');
const express = require('express');
const router = express.Router();

router.get("/lastSixMonthsCaseInitiationData",caseInitiationController.getLastSixMonthsCaseInitiated);
router.get("/dateWiseCaseInitiationData/:monthYear",caseInitiationController.getDateWiseCaseInitiationCount);

router.get("/lastSixMonthsOutputQcCompletionCount",caseInitiationController.getLastSixMonthsOutputQcCompletionCount);
router.get("/dateWiseOutputQcCompletionCount/:monthYear",caseInitiationController.getDateWiseOutputQcCompletionCount);

router.get("/totalActualComponentsCountForLastSixMonths",caseInitiationController.getTotalActualComponentsForLastSixMonths);



module.exports = router;
