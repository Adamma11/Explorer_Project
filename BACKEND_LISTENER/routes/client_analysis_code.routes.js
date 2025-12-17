const clientAnalysisCode = require('../controllers/administration/client_analysis_code.controller')
const express = require('express')
const router = express.Router()

router.post('/',clientAnalysisCode.create)
router.delete('/deleteallforclient/:client',clientAnalysisCode.deleteAllForClient)
router.get('/:client/:analysisType',clientAnalysisCode.readForAClientAndType)
module.exports = router

