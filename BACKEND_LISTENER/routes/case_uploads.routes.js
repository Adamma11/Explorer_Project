const express = require('express');
const router = express.Router();
const caseUploadController = require("../controllers/uploads/case_upload.controller")

router.post("/case_upload", caseUploadController.create);

module.exports = router
