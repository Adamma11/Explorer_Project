const rejectedCase = require('../controllers/uploads/rejected_case.controller');
const express = require('express');
const router = express.Router();

router.post('/',rejectedCase.create);
router.get('/batch/:batch',rejectedCase.findAllForABatch);

module.exports = router;