const express = require('express')
const router = express.Router()
const { sendEmailCde } = require('../controllers/uploads/sendEmailCde.controller')

router.post("/", sendEmailCde)

module.exports = router