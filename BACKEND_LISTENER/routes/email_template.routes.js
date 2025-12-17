const emailTemplate = require('../controllers/masters/email_template.controller');
const express = require('express');
const router = express.Router();

router.post("/",emailTemplate.create);
router.get("/",emailTemplate.findAll);
router.get("/:_id",emailTemplate.findOne);
router.put("/:_id",emailTemplate.update);
router.delete("/:_id",emailTemplate.delete);
module.exports = router;
