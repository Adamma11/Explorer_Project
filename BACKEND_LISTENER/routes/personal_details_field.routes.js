const personalDetailsField = require('../controllers/administration/personal_details_field.controller');
const express = require('express');
const router = express.Router();

router.get("/",personalDetailsField.findAll);
router.put("/:_id",personalDetailsField.update);
module.exports = router;