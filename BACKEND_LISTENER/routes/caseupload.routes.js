const caseUpload = require("../controllers/uploads/case_upload.controller.js")
const express = require("express")
const router = express.Router()

router.post("/", caseUpload.create)

module.exports = router
